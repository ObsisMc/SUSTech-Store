export const store = {
  debug: false,
  state: {
    token: '',
    database: 'http://10.21.64.1:8181/'
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
