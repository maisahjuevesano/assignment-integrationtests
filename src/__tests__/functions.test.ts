import { IMovie } from "../ts/models/Movie";
import { movieSort } from "../ts/functions";
import { mockData } from "../ts/services/__mocks__/movieservice";
import * as functions from "../ts/functions";

describe("sorting movies", () => {
  test("should sort list alphabetical ", () => {
    //Arrange

    expect.assertions(3);
    let movies: IMovie[] = mockData;

    functions.movieSort(movies);

    expect(movies[0].Title).toEqual("Harry Potter III");
    expect(movies[1].Title).toEqual("Star Wars IV");
    expect(movies[2].Title).toEqual("The Lord of the Rings");
  });

  test("should not be able to sort", () => {
    expect.assertions(4);
    let movies: IMovie[] = [
      {
        Title: "Star Wars",
        imdbID: "31841",
        Type: "text",
        Poster: "poster",
        Year: "1977",
      },
      {
        Title: "Star Wars",
        imdbID: "41630",
        Type: "text",
        Poster: "poster",
        Year: "2005",
      },
      {
        Title: "Star Wars",
        imdbID: "92386",
        Type: "text",
        Poster: "poster",
        Year: "1983",
      },
    ];

    functions.movieSort(movies);

    //testa med unika årtal och imdbID
    expect(movies[0].Year).toEqual("1977");
    expect(movies[0].imdbID).toEqual("31841");

    expect(movies[1].Year).toEqual("2005");
    expect(movies[1].imdbID).toEqual("41630");
  });

  test("should not be able to sort", () => {
    expect.assertions(4);
    let movies: IMovie[] = [
      {
        Title: "Star Wars",
        imdbID: "31841",
        Type: "text",
        Poster: "poster",
        Year: "1977",
      },
      {
        Title: "Star Wars",
        imdbID: "41630",
        Type: "text",
        Poster: "poster",
        Year: "2005",
      },
      {
        Title: "Star Wars",
        imdbID: "92386",
        Type: "text",
        Poster: "poster",
        Year: "1983",
      },
    ];

    functions.movieSort(movies, false); //sätter false för att göra reverse sorting

    expect(movies[0].Year).toEqual("1977");
    expect(movies[0].imdbID).toEqual("31841");

    expect(movies[1].Year).toEqual("2005");
    expect(movies[1].imdbID).toEqual("41630");
  });

  test("should sort reversed alphabetical", () => {
    expect.assertions(3);
    let movies: IMovie[] = [
      {
        Title: "Star Wars IV",
        imdbID: "31841",
        Type: "text",
        Poster: "poster",
        Year: "1977",
      },
      {
        Title: "The Lord of the Rings",
        imdbID: "94752",
        Type: "text",
        Poster: "poster",
        Year: "2001",
      },
      {
        Title: "Harry Potter III",
        imdbID: "18463",
        Type: "text",
        Poster: "poster",
        Year: "2001",
      },
    ];

    functions.movieSort(movies, false);

    expect(movies[0].Title).toEqual("The Lord of the Rings");
    expect(movies[1].Title).toEqual("Star Wars IV");
    expect(movies[2].Title).toEqual("Harry Potter III");
  });
});
