# ChefExpress

## What is this?

This is my first real-world project. I worked full-time on it, and in the process, I learned all the basics, and not so basics, of web development.

This README is about the lessons learned. It was a bumpy road.

## What for?

To replace a 90s desktop application used to manage all the aspects of a hotel's kitchen, with a modern web solution. 

## What it does?

The main idea is very simple:

- You have ingredients with some properties.
- You then have recipes, which are composed of ingredients. They also have extra info attached to them.
- And then you have menus composed of recipes.

As far as the data model goes, this may well be an academic exercise. But things got a lot more complicated than that.
 
## Is this usable?

No. Even though it saw production usage, it's broken in its current state. This is an overview of the mistakes I made in the development process.

## Mistakes were made

### The technology stack

This is where my mistakes began. Back then, I was all about the latest and greatest. I didn't have experience with any technology, so I thought that learning the "hot stuff" was the right thing to do. Little did I know.


### Frontend

I wanted the UI to feel as close as possible to a desktop application. So I decided that building a SPA was a good idea. My choice was AngularJS.

I won't say it wasn't the right tool for the job, but not very beginner-friendly, to say the least. Thankfully the framework was very well-structured and kept me away from making horrible design mistakes. This was my first dive into a "real" framework, so I got the AngularJS book and studied it from start to finish. Very handy.

Still, it was in the frontend development where I spent the most time. Learning about UX design is no joke, especially when performance matters.

The meat was in table views, as they had the core functionality. I liked the spreadsheet approach: cells that the user can click and edit very easily. There are some tradeoffs with that approach: the lack of confirmation by the user when editing a field meant that I needed to implement an undo functionality. Not a trivial thing to do.

The "double binding" that Angular provides is awesome and a perfect fit for this design, but things started to get laggy real quick. Then it became "one-way binding". After that, I realized that some form of pagination was necessary (another system to implement).

It felt nice to use. Still, I thought that the user should have some way of editing multiple rows of data at once. So I did that. But what if the user navigates to another page? Should those "selected rows" be saved only for the current page? I went a bit further and allowed the "selected rows" to be memorized across different pages. Another time sink.

The rest of the views are pretty simple. You click an item, and you get a detailed view of it. Standard CRUD stuff.

I should mention that back then I hated writing HTML, and I had experience using Jade before as a template engine, which is way less verbose. A bit more complex than your regular setup.

Since I was a one-man army, spending time on pretty visuals had the lowest priority. I used Bootstrap 4 as a starting point and called it a day.

### The backend

The choice was NodeJS along with ExpressJS. The popularity was off the charts at that time, and it seemed to be "the future". Keep in mind that I didn't fully understand async programming back then. Realizing what NodeJS main's loop was all about was very interesting too. Everything runs in parallel but your crappy code.

To be fair, this part was probably the least painful of all three. I had to write my own middleware for protecting API requests, which was fun. Planning the API design wasn't.

Obviously, it had to be a REST API. Again, it was the hot stuff. Sticking to the specification was a bit of a problem. I wanted to learn the "good practices," and I followed the REST standard way too strictly. For example:

Like I mentioned, the user had the capability of only editing a single field of a whole "entity." Why would you send the whole thing when you could send only the ID and the updated field? A PATCH request fits well! (and it does). But now you need to implement the logic in the backend to be able to surgically update a single field of an entity. Much more complex than just sending a POST request with the whole thing and replacing it in the database.

It got to a point where "going out spec" was a thing. What if the user needs to update 500 entities? Is sending 500 requests viable? It may be what the book says, but it's also super slow and a nightmare to do any error handling.

So I created endpoints for bulk requests. Things got easier at first glance, but now I had to duplicate CRUD logic, what a pain!. Long story short, I ended up refactoring the API three times.

### The database

It had to be MongoDB. What else would it be? Now it was officially an SPA built with the MEAN stack! What could go wrong? It made absolutely no sense, but again: hot stuff! Modeling relational data with a non-relational DB was dumb (mind you, I had never used any type of DB before).

I used Mongoose as ODM, which helped keep things reasonably organized. But once you start twisting a tool to fit your needs, you know deep down that something is off...

Since entities were heavily related to each other, there was a big amount of join operations. They were slow. I tried performing data denormalization to speed up data access, but data consistency was a thing now. I kept the joins and implemented a cache system and a few indexes.


### Special mentions: package managers, build tools, versioning control and testing.

I used Bower and NPM as package managers. This is probably the biggest mistake I made: not locking any package version at all. It was "latest" on all of them. So here I am, 10 years later trying to deploy the code. Not fun. Actually, the only reason I was able to deploy the project so long after it's because I found an old backup with the .lock files on it.

Grunt was my option as a build tool. The pipeline was trivial: apply minification and obfuscating all the frontend files.

As you can see, I used git as a repo. Some mistakes worth mentioning:

- Just one branch
- A single commit usually included changes to many parts of the application
- No defined milestones
- Poor commit messages 

About tests: I made a few using Selenium, but it was very time-consuming. So "production testing" was a thing.

## Long story short

It may look like this was a complete failure of a project, and it was in a sense. But many years later a desktop application was born out of this. That one is a commercial solution which sees real-world usage!.

I find that it is very important to be aware of the mistakes I made in the past. Still, there is a long way to go.
