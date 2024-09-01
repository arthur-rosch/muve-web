const keys = {
  USER: '@storage:userId',
  JWT: '@storage:jwt',
}

type Keys = keyof typeof keys

export class Local {
  static async setUser(userId: string) {
    return await this.set('USER', JSON.stringify(userId))
  }

  static async setJWT(jwt: string) {
    return await this.set('JWT', JSON.stringify(jwt))
  }

  static async get(key: Keys) {
    try {
      return localStorage.getItem(keys[key])?.slice(1, -1)
    } catch (error) {
      alert(error)
    }
  }

  static async set(key: Keys, value: string) {
    try {
      return localStorage.setItem(keys[key], value)
    } catch (error) {
      alert(error)
    }
  }

  static async cleanAll() {
    try {
      localStorage.clear()
    } catch (error) {
      alert(error)
    }
  }

  static async logout() {
    localStorage.removeItem(keys.JWT)
    localStorage.removeItem(keys.USER)
  }
}
