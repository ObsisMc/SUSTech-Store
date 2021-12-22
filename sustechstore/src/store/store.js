export const store = {
  debug: false,
  state: {
    token: '1',
    database: "http://10.15.211.127:8181/",
    storetype: "1"
  },
  setToken (newValue) {
    if (this.debug) console.log('setMessageAction triggered with', newValue)
    this.state.token = newValue;
  },
  clearToken () {
    if (this.debug) console.log('clearMessageAction triggered')
    this.state.token = '';
  }
}
