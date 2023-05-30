describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'testpassword',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login form exists', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Login')
    cy.contains('Username')
    cy.contains('Password')
  })

  it('can login', function () {
    cy.visit('http://localhost:3000')
    cy.get('#username').type('testuser')
    cy.get('#password').type('testpassword')
    cy.get('button[type="submit"]').click()

    cy.contains('Test User logged in')
  })

  it('fails login if wrong password', function () {
    cy.visit('http://localhost:3000')
    cy.get('#username').type('testuser')
    cy.get('#password').type('wrongpassword')
    cy.get('button[type="submit"]').click()

    cy.contains('Invalid username or password')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testuser', password: 'testpassword' })
    })

    it('a new blog can be created', function () {
      cy.contains('Add Blog').click()

      cy.get('#title').type('Test Title')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('http://localhost:3000')
      cy.get('button[type="submit"]').click()

      cy.contains('Test Title')
      cy.contains('Test Author')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Test Title',
          author: 'Test Author',
          url: 'http://localhost:3000',
        })
      })

      it('then it can be liked', function () {
        cy.contains('View details').click()
        cy.contains('Like').click()
        cy.contains('likes 1')
      })

      it('then it can be deleted', function () {
        cy.contains('View details').click()
        cy.contains('Delete').click()
        cy.contains('Test Title').should('not.exist')
      })

      it('cant see delete button if not owner', function () {
        cy.contains('logout').click()
        const user = {
          name: 'Test User 2',
          username: 'testuser2',
          password: 'testpassword2',
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.login({ username: 'testuser2', password: 'testpassword2' })
        cy.contains('View details').click()
        cy.contains('Delete').should('not.exist')
      })
    })

    describe('and multiple blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Least likes',
          author: '4',
          url: 'http://localhost:3000',
          likes: 0,
        })
        cy.createBlog({
          title: '2nd least likes',
          author: '2',
          url: 'http://localhost:3000',
          likes: 6,
        })
        cy.createBlog({
          title: '3rd least likes',
          author: '3',
          url: 'http://localhost:3000',
          likes: 2,
        })
        cy.createBlog({
          title: 'Most liked',
          author: '1',
          url: 'http://localhost:3000',
          likes: 1234,
        })
      })
      it('blogs are sorted by likes', function () {
        cy.get('.blog').eq(0).contains('Most liked')
        cy.get('.blog').eq(1).contains('2nd least likes')
        cy.get('.blog').eq(2).contains('3rd least likes')
        cy.get('.blog').eq(3).contains('Least likes')
      })
    })
  })
})
