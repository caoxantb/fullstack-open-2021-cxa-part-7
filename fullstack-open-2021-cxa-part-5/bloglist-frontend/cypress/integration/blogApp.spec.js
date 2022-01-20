describe("Blog app", function () {
  let user;

  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    user = {
      name: "cxan",
      username: "cxan",
      password: "cxan",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  describe("Login", function () {
    it("Login form is defaultly shown", function () {
      cy.contains("Log in");
      cy.contains("username");
      cy.contains("password");
    });

    it("Login form works with correct credentials", function () {
      cy.get("#username").type(user.username);
      cy.get("#password").type(user.password);
      cy.get("#login-button").click();

      cy.contains(`${user.username} logged in`);
    });

    it("Login form does not work with incorrect credentials", function () {
      cy.get("#username").type("sth");
      cy.get("#password").type("sth");
      cy.get("#login-button").click();

      cy.get(".error").should("contain", "Wrong username or password");
      cy.get("html").should("not.contain", "logged in");
    });
  });

  describe("Logged in", function () {
    beforeEach(function () {
      cy.login({ username: "cxan", password: "cxan" });
      cy.createBlog({
        title: "first blog",
        author: "first author",
        url: "first url",
      });
      cy.createBlog({
        title: "second blog",
        author: "second author",
        url: "second url",
      });
      cy.createBlog({
        title: "third blog",
        author: "third author",
        url: "third url",
      });
    });

    it("a new blog can be created", function () {
      cy.get("#button-togg-create-new-blog").click();
      cy.get("#title").type("new blog created by cypress");
      cy.get("#author").type("new author created by cypress");
      cy.get("#url").type("new url created by cypress");
      cy.get("#button-submit-blog").click();

      cy.contains("new blog created by cypress");
    });

    it("like button works", function () {
      cy.get("#button-togg-show").click();
      cy.get("#button-like").click();

      cy.get(".like").should("contain", "1");
    });

    it("delete button works", function () {
      cy.get("#button-togg-show").click();
      cy.get("#button-delete").click();

      cy.get("html").should("not.contain", "new blog by new author");
    });

    it("check blogs sort", function () {
      cy.contains("third blog").parent().find("#button-togg-show").click();
      for (let i = 0; i < 3; i++) {
        cy.contains("third blog").parent().find("#button-like").click();
      }

      cy.contains("first blog").parent().find("#button-togg-show").click();
      for (let i = 0; i < 2; i++) {
        cy.contains("first blog").parent().find("#button-like").click();
      }

      cy.contains("second blog").parent().find("#button-togg-show").click();
      cy.contains("second blog").parent().find("#button-like").click();

      cy.get(".title-and-author").should(($el) => {
        const elText = $el.toArray().map((el) => el.innerText);
        expect(elText).to.deep.eq([
          "third blog by third author",
          "first blog by first author",
          "second blog by second author",
        ]);
      });
    });
  });
});
