import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, register, getUserInfo, upgradeToPodcaster } from "@/services/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  user: any;
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  token: null,
};

// 🎯 Login
export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { access_token } = await login(email, password);
      await AsyncStorage.setItem("auth_token", access_token);
      const user = await getUserInfo();
      await AsyncStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// 🎯 Signup
export const signUp = createAsyncThunk(
  "auth/signUp",
  async (
    {
      name,
      email,
      password,
      confirmPassword,
    }: { name: string; email: string; password: string; confirmPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await register(name, email, password, confirmPassword);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Signup failed");
    }
  }
);

// 🎯 Get current user
export const fetchUserInfo = createAsyncThunk("auth/fetchUserInfo", async (_, { rejectWithValue }) => {
  try {
    const user = await getUserInfo();
    return user;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Failed to fetch user info");
  }
});

// 🎯 Upgrade role
export const upgradeRole = createAsyncThunk("auth/upgradeRole", async (_, { rejectWithValue }) => {
  try {
    await upgradeToPodcaster();
    const updatedUser = await getUserInfo();
    return updatedUser;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Upgrade failed");
  }
});
export const restoreSession = createAsyncThunk("auth/restore", async (_, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem("auth_token");
    const userJson = await AsyncStorage.getItem("user");

    if (!token || !userJson) return null;

    const user = JSON.parse(userJson);
    return { token, user };
  } catch (err) {
    return rejectWithValue("Échec de la restauration de session");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      AsyncStorage.removeItem("auth_token");
      AsyncStorage.removeItem("user");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(upgradeRole.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(restoreSession.pending, (state) => {
  state.loading = true;
})
.addCase(restoreSession.fulfilled, (state, action) => {
  if (action.payload) {
    state.user = action.payload.user;
    state.token = action.payload.token;
  }
  state.loading = false;
})
.addCase(restoreSession.rejected, (state) => {
  state.loading = false;
})
;
  },
});

export const { signOut, clearError } = authSlice.actions;
export default authSlice.reducer;
