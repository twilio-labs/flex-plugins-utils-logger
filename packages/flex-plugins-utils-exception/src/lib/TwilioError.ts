// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructable<T> = new (...args: any[]) => T;

/**
 * Base class for all errors generated by the script
 */
export default class TwilioError extends Error {
  constructor(msg?: string) {
    super(msg);

    Object.setPrototypeOf(this, TwilioError.prototype);
  }

  /**
   * Returns whether this is the instance of the passed class
   * @param klass the error class to test for
   */
  public instanceOf = <T extends Error>(klass: Constructable<T>): boolean => {
    // eslint-disable-next-line consistent-this, @typescript-eslint/no-this-alias
    let instance = this;
    while (instance && instance !== Object.prototype) {
      if (!instance || !instance.constructor || !instance.constructor.name) {
        return false;
      }

      if (klass.name === instance.constructor.name) {
        return true;
      }

      instance = Object.getPrototypeOf(instance);
    }

    return false;
  };
}
