const NPromise = require("../new_promise.js");

describe("Promise", () => {
  it("should create a new Promise with pending state", () => {
    const promise = new NPromise(() => {});
    expect(promise.state).toBe("pending");
    expect(promise.value).toBe("undefined");
  });

  describe("When fulfilled", () => {
    it("should THEN a Promise", done => {
      return new NPromise(resolve => resolve({ dados: "fake" })).then(
        response => {
          expect(response.dados).toBe("fake");
          done();
        }
      );
    });

    it("should call THEN just when the async code is resolved", done => {
      return new NPromise(resolve => {
        setTimeout(() => {
          resolve({ dados: "fake" }), 10;
        });
      }).then(response => {
        expect(response.dados).toBe("fake");
        done();
      });
    });

    it("should allow the same Promise to be THENABLE multiple times", done => {
      const p1 = new NPromise(resolve =>
        setTimeout(() => resolve({ dados: "fake" }), 10)
      );

      p1.then(response => expect(response.dados).toBe("fake"));
      p1.then(response => {
        expect(response.dados).toBe("fake");
        done();
      });
    });

    it("should support chain of promises on which promises are returned", done => {
      const fakeFSPromis = new Promise(resolve =>
        setTimeout(() => resolve({ file: "photo1.jpg" }), 10)
      );

      return new NPromise(resolve => {
        setTimeout(() => resolve({ dados: "promise1" }), 10);
      })
        .then(response => {
          expect(response.dados).toBe("promise1");
          return fakeFSPromis;
        })
        .then(response => {
          expect(response.file).toBe("photo1.jpg");
          done();
        });
    });
  });

  describe("Error handling", () => {
    it("should call CATCH when an error is thrown", done => {
      const errorMessage = "Promise foi rejeitada";

      return new NPromise((resolve, reject) => {
        setTimeout(() => reject(new Error(errorMessage)), 10);
      }).catch(error => {
        expect(error.message).toBe(errorMessage);
        done();
      });
    });

    it("should allow CATCH to be THENABLE", done => {
      const errorMessage = "Promise foi rejeitada";

      const dados_on_error = "alguns dados - test case CATCH > THENABLE";

      return new NPromise((resolve, reject) => {
        setTimeout(() => reject(new Error(errorMessage)), 10);
      })
        .catch(error => {
          expect(error.message).toBe(errorMessage);
          return { dados: dados_on_error };
        })
        .then(response => {
          expect(response.dados).toBe(dados_on_error);
          done();
        });
    });

    it("should allow to catch a thrown error by a previous CATCH method", done => {
      const errorMessage = "Promise foi rejeitada";

      const dados_on_error = "erro interceptado";

      return new NPromise((resolve, reject) => {
        setTimeout(() => reject(new Error(errorMessage)), 10);
      })
        .catch(error => {
          expect(error.message).toBe(errorMessage);
          throw new Error(dados_on_error);
        })
        .catch(error => {
          expect(error.message).toBe(dados_on_error);
          done();
        });
    });
  });
});
