export const store = {
  debug: false,
  state: {
    token: '1',
    database: "http://120.76.174.231:8181/",
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
