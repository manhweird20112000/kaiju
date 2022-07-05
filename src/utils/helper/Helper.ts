export default class Helper {
  static isEmail(email: string): boolean {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  static isPhone(phone: string): boolean {
    const regex = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/g;
    return regex.test(phone);
  }
}
