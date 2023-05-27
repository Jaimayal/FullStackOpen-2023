const listHelper = require("../utils/list_helper");

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

describe("Dummy test", () => {
	test("dummy returns one", () => {
		const blogs = [];

		const result = listHelper.dummy(blogs);
		expect(result).toBe(1);
	});
});

describe("Sum of", () => {
	test("empty likes array should return 0", () => {
		expect(listHelper.sumLikes([])).toBe(0);
	});

	test("one element in the likes array is correct", () => {
		expect(listHelper.sumLikes([blogs[0]])).toBe(7);
	});

	test("multiple elements in the likes array is correct", () => {
		expect(listHelper.sumLikes(blogs)).toBe(36);
	});
});


describe("Favorite Blog", () => {
  test("given an empty list, then empty object is expected", () => {
    expect(listHelper.favoriteBlog([])).toEqual({});
  })

  test("given a list of blogs, then blog with most likes is expected", () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    });
  })
})

describe("Author with most blogs", () => {
  test("given an empty list, then empty object is expected", () => {
    expect(listHelper.authorWithMostBlogs([])).toEqual({});
  })

  test("given a list of blogs, then the proper author with the blogs amount is expected", () => {
    expect(listHelper.authorWithMostBlogs(blogs)).toEqual({
      author: "Robert C. Martin",
      blogs: 3
    });
  })
})

describe("Author with most likes", () => {
  test("given an empty list, then empty object is expected", () => {
    expect(listHelper.authorWithMostLikes([])).toEqual({});
  })

  test("given a list of blogs, then the proper author with the amount of likes they have received is expected", () => {
    expect(listHelper.authorWithMostLikes(blogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    });
  })
})