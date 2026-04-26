export const store = {
  user: null,
  isAuthenticated: false,

  setUser(user: any) {
    this.user = user;
    this.isAuthenticated = true;
  },

  logout() {
    this.user = null;
    this.isAuthenticated = false;
  },
};