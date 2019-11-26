const MiddlewareManager = require("../middleware_maganer1");

const middlewareManager = new MiddlewareManager();

describe("MiddlewareManager", () => {
  it("should create a new instance of middleware_manager", () => {
    expect(middlewareManager).toBeInstanceOf(MiddlewareManager);
  });

  it("should process all middlewares in order before reaching the end", () => {
    const logMiddleware = (dados, next) => {
      //console.log("logMiddleware", dados.user);
      next();
    };

    const enhanceMiddleware = (dados, next) => {
      dados.user.firstName = dados.user.name.split(" ")[0];
      //console.log("enhanceMiddleware", dados.user.firstName);
      next();
    };

    const expectMiddleware = (dados, next) => {
      //console.log("expectMiddleware", dados.user.firstName);
      expect(dados.user.firstName).toBe("Jane");
      next();
    }

    const defaultData = {
      user: {
        name: "Jane Doe"
      }
    };

    middlewareManager.use(logMiddleware);
    middlewareManager.use(enhanceMiddleware)
    middlewareManager.use(expectMiddleware)

    middlewareManager.process(defaultData);
  });
});
