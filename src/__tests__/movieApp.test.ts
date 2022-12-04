/**
 * @jest-environment jsdom
 */
import { IMovie } from "../ts/models/Movie";
import * as movieAppFunctions from "./../ts/movieApp";
import * as movieserviceFunction from "./../ts/services/movieservice";
jest.mock("./../ts/services/movieservice.ts");

describe("init", () => {
  //1x
  test("should be able to call fn handleSubmit", () => {
    //arrange
    let spy = jest.spyOn(movieAppFunctions, "handleSubmit").mockReturnValue(
      new Promise((resolve) => {
        resolve();
      })
    );

    document.body.innerHTML = `
  <form id="searchForm">
  <button type="submit" id= "search">Sök</button>
  </form>`;
    movieAppFunctions.init();

    //act
    (document.getElementById("searchForm") as HTMLFormElement)?.submit();

    //assert
    expect(spy).toHaveBeenCalled();
    document.body.innerHTML = "";
  });
});

describe("handleSubmit", () => {
  //"återställa" tidigare mocks mm. Nu ny mock på axios ist för movieservice
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  jest.mock("axios", () => ({
    get: async () => {
      return new Promise((reject) => {
        reject({
          data: [],
        });
      });
    },
  }));

  test("should call createHtml", async () => {
    expect.assertions(1);
    document.body.innerHTML = `<form id="searchForm">
    <input type="text" id="searchText" value="star" placeholder="Skriv titel här" />
    <button type="submit" id="search">Sök</button>
    </form> <div id="movie-container"></div>`;
    let spy = jest.spyOn(movieAppFunctions, "createHtml").mockReturnValue();

    //Act
    await movieAppFunctions.handleSubmit();

    //assert
    expect(spy).toHaveBeenCalled();
    document.body.innerHTML = "";
  });

  test("should call displayNoResult", async () => {
    //arrange
    document.body.innerHTML = `<form id="searchForm">
    <input type="text" id="searchText" value="star" placeholder="Skriv titel här" />
    <button type="submit" id="search">Sök</button>
  </form>
  <div id="movie-container"></div>`;
    let searchText: string = (
      document.getElementById("searchText") as HTMLInputElement
    ).value;
    searchText = "";
    let container: HTMLDivElement = document.getElementById(
      "movie-container"
    ) as HTMLDivElement;

    let dataSpy = jest
      .spyOn(movieserviceFunction, "getData")
      .mockImplementation(
        () =>
          new Promise((reject) => {
            reject([]);
          })
      );

    let spy = jest
      .spyOn(movieAppFunctions, "displayNoResult")
      .mockReturnValue();

    //act
    try {
      await movieAppFunctions.handleSubmit();
    } catch {
      //assert
      expect(dataSpy).toHaveBeenCalled();
      expect(spy).toBeCalledWith(container);
      expect(movieserviceFunction.getData).toHaveBeenCalledTimes(1);
    }

    // }
  });

  test("Should create HTML", async () => {
    //arrange

    document.body.innerHTML = `
  <div id="movie-container"></div>
  `;
    let container = document.getElementById(
      "movie-container"
    ) as HTMLDivElement;
    let searchText: string = "GivemeSushi";
    let movies: IMovie[] = await movieserviceFunction.getData(searchText);

    //act
    movieAppFunctions.createHtml(movies, container);

    //assert
    expect(document.querySelectorAll("h3").length).toBe(3);
    expect(document.querySelectorAll("div.movie").length).toBe(3);
    document.body.innerHTML = "";
  });

  describe("displayNoResult", () => {
    document.body.innerHTML = "";
    test("should create p-tag in container div", () => {
      document.body.innerHTML = `<div id="movie-container"></div> `;
      let container: HTMLDivElement = document.getElementById(
        "movie-container"
      ) as HTMLDivElement;

      movieAppFunctions.displayNoResult(container);

      //assert
      expect(container.innerHTML).toContain("<p>Inga sökresultat att visa</p>");
    });
  });
});
