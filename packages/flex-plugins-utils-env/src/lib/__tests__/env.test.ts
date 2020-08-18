import env, * as allEnv from '../env';

describe('env', () => {
  const OLD_ENV = process.env;
  const manager = {
    configuration: {
      logLevel: '',
    },
  };

  beforeEach(() => {
    process.env = { ...OLD_ENV };
    manager.configuration.logLevel = '';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).Twilio = {
      Flex: {
        Manager: {
          getInstance: () => manager,
        },
      },
    };

    jest.restoreAllMocks();
  });

  describe('persistTerminal', () => {
    it('should set the terminal to persist', () => {
      delete process.env.PERSIST_TERMINAL;
      env.persistTerminal();

      expect(process.env.PERSIST_TERMINAL).toEqual('true');
    });

    it('should not set env if not node', () => {
      jest.spyOn(allEnv.default, 'isNode').mockReturnValue(false);
      delete process.env.PERSIST_TERMINAL;
      env.persistTerminal();

      expect(process.env.PERSIST_TERMINAL).toBeUndefined();
    });
  });

  describe('isTerminalPersisted', () => {
    it('should return true', () => {
      process.env.PERSIST_TERMINAL = 'true';
      expect(env.isTerminalPersisted()).toEqual(true);
    });

    it('should return false', () => {
      expect(env.isTerminalPersisted()).toEqual(false);
    });
  });

  describe('debug', () => {
    it('should return true', () => {
      process.env.DEBUG = 'true';
      expect(env.isDebug()).toEqual(true);
    });

    it('should return with trace true', () => {
      process.env.TRACE = 'true';
      expect(env.isDebug()).toEqual(true);
    });

    it('should return false', () => {
      expect(env.isDebug()).toEqual(false);
    });

    it('should return true because twilio config is set', () => {
      jest.spyOn(allEnv.default, 'isNode').mockReturnValue(false);
      manager.configuration.logLevel = 'debug';

      expect(env.isDebug()).toEqual(true);
    });

    it('should return false because twilio config is set', () => {
      jest.spyOn(allEnv.default, 'isNode').mockReturnValue(false);
      manager.configuration.logLevel = 'info';

      expect(env.isDebug()).toEqual(false);
    });

    it('should return false because no twilio env is st', () => {
      jest.spyOn(allEnv.default, 'isNode').mockReturnValue(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).Twilio;

      expect(env.isDebug()).toEqual(false);
    });
  });

  describe('trace', () => {
    it('should return true', () => {
      process.env.TRACE = 'true';
      expect(env.isTrace()).toEqual(true);
    });

    it('should return false', () => {
      expect(env.isTrace()).toEqual(false);
    });

    it('should return true because twilio config is set', () => {
      jest.spyOn(allEnv.default, 'isNode').mockReturnValue(false);
      manager.configuration.logLevel = 'trace';

      expect(env.isTrace()).toEqual(true);
    });

    it('should return false because twilio config is set', () => {
      jest.spyOn(allEnv.default, 'isNode').mockReturnValue(false);
      manager.configuration.logLevel = 'info';

      expect(env.isTrace()).toEqual(false);
    });

    it('should return false because no twilio env is st', () => {
      jest.spyOn(allEnv.default, 'isNode').mockReturnValue(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).Twilio;

      expect(env.isTrace()).toEqual(false);
    });
  });

  describe('quiet', () => {
    it('should return true', () => {
      process.env.QUIET = 'true';
      expect(env.isQuiet()).toEqual(true);
    });

    it('should return false', () => {
      expect(env.isQuiet()).toEqual(false);
    });
  });

  describe('getRealm', () => {
    it('should return realm', () => {
      process.env.REALM = 'stage';

      expect(env.getRealm()).toEqual('stage');
    });
  });
});
