const keys = {
  USER: '@storage:userId',
  JWT: '@storage:jwt',
  PLAN: '@storage:plan',
}

type Keys = keyof typeof keys

export class Local {
  static async setUser(userId: string) {
    return await this.set('USER', JSON.stringify(userId))
  }

  static async setJWT(jwt: string) {
    return await this.set('JWT', JSON.stringify(jwt))
  }

  static async setPlan(
    plan: string,
    validity: string,
    chargeFrequency: string,
  ) {
    const planInfo = { plan, validity, chargeFrequency }
    return await this.set('PLAN', JSON.stringify(planInfo))
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
    localStorage.removeItem(keys.PLAN)
  }
}
