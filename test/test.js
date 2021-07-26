const { Builder } = require("selenium-webdriver");
require("chromedriver");

var assert = require("assert");

describe("Testing card custom element", function () {
  let driver;

  before(async function () {
    driver = new Builder().forBrowser("chrome").build();
    await driver.get("http://127.0.0.1:5500/main.html");
  });

  describe("click on arrow should render two sections", function () {
    it("about", async function () {
      await driver.findElement({ id: "toggle" }).click();

      let aboutElement = await driver.findElements({
        className: "aboutContainer",
      });
      assert.strictEqual(await aboutElement.length, 1);
    });

    it("info", async function () {
      let infoElement = await driver.findElements({
        className: "infoContainer",
      });
      assert.strictEqual(await infoElement.length, 1);
    });
  });

  describe("click again and sections should be removed", function () {
    it("about", async function () {
      await driver.findElement({ id: "toggle" }).click();

      let aboutElement = await driver.findElements({
        className: "aboutContainer",
      });
      assert.strictEqual(await aboutElement.length, 0);
    });

    it("info", async function () {
      let infoElement = await driver.findElements({
        className: "infoContainer",
      });
      assert.strictEqual(await infoElement.length, 0);
    });
  });

  describe("click on menu button should change", function () {
    it("style display hidden", async function () {
      let menuElement = await driver.findElement({ id: "menu" });
      assert.strictEqual(await menuElement.getCssValue("display"), "none");
    });
    it("to block", async function () {
      await driver.findElement({ id: "menuButton" }).click();
      let menuElement = await driver.findElement({ id: "menu" });
      assert.strictEqual(await menuElement.getCssValue("display"), "block");
    });
  });

  describe("input on menu fields should change", function () {
    var cardElement;
    it("setting inputs", async function () {
      await driver.findElement({ id: "inputName" }).sendKeys("Morty");
      await driver.findElement({ id: "inputNamecolor" }).sendKeys("Blue");
      await driver.findElement({ id: "inputTwitter" }).sendKeys("RickandMorty");
      await driver.findElement({ id: "inputGithub" }).sendKeys("getify");
      await driver
        .findElement({ id: "inputWebsite" })
        .sendKeys("https://developer.mozilla.org/en-US/");
      await driver.findElement({ id: "inputLocation" }).sendKeys("Los Angeles");

      await driver.findElement({ id: "submit" }).click();

      await driver.findElement({ id: "toggle" }).click();
      cardElement = await driver.findElement({ id: "customCard" });
    });

    it("name attribute", async function () {
      assert.strictEqual(await cardElement.getAttribute("name"), "Morty");
    });
    it("nameColor attribute", async function () {
      assert.strictEqual(await cardElement.getAttribute("nameColor"), "Blue");
    });
    it("twitter attribute", async function () {
      assert.strictEqual(
        await cardElement.getAttribute("twitter"),
        "RickandMorty"
      );
    });
    it("github attribute", async function () {
      assert.strictEqual(await cardElement.getAttribute("github"), "getify");
    });
    it("webSite attribute", async function () {
      assert.strictEqual(
        await cardElement.getAttribute("webSite"),
        "https://developer.mozilla.org/en-US/"
      );
    });
    it("location attribute", async function () {
      assert.strictEqual(
        await cardElement.getAttribute("location"),
        "Los Angeles"
      );
    });
    it("check if menu has hide", async function () {
      let menuElement = await driver.findElement({ id: "menu" });
      assert.strictEqual(await menuElement.getCssValue("display"), "none");
    });
  });

  after(async function () {
    await driver.quit();
  });
});
