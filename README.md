## About This Repo:

This Repo has the boilerplate for a basic Next.js App connected to Mongo DB through the Mongoose library. All the basic app structures and connections have been put in place for you. It's up to you to build them out following our specs. Before we get to our specs, let's take a closer look at some of the folders:

### @/public

Put all your public assets here like images, documents, etc.

### @/src

This is where most of the app source code lives

### @/src/app

This folder contains your front-end and API routes per the Next.js 13 specs

### @/src/db

This folder contains a connection file for Mongo DB via Mongoose and a folder for your Mongoose Model definitions

### @/src/db/models

This folder contains the 3 defined mongoose models you will be working with in the DB

### @/src/db/generators

This folder contains the various scripts needed to pre-populate the database with various documents.

## Project Specs (Requirements):

Now let's dive into the actual specs we're looking for upon completion of this project. These specs are not going to be incredibly comprehensive. Think of them more like guidelines than blueprints. Our philosophy is that (company) Engineers should be able to take general guidelines and create an architecture and implementation that is performant, secure, and follows the best practices for its respective technologies.

### Environment Variables

Feel free to define any/as many of these as needed. Make sure to include your .env file though. Also, don't forget to define any env variables in the `env.json` config file *DO NOT MODIFY THE FOLLOWING VARIABLES IN* `.env.defaults`

- MONGODB_URI
- PARTICIPANT

That being said: let's go over the specs.

### Database

- DB seeding can be done automatically by running `npm run seed-db` and following the prompts.
- Your DB partition will come pre-seeded with 50,000 documents for each model type.
- Your database should be seeded with 50,000 documents for each of the three DB models at the time you submit your app. *It will take quite a while to generate that many documents if you have to re-run the seed script, so it is recommended to either start seeded with those numbers or give yourself plenty of time for the script to run*
- Use indexes and caches as needed.
- Make sure to use Mongoose for your DB implementations.

### API

- All routes are expected to employ correct and consistent status codes and response body formatting.
- While we will be looking for functionality, security, and efficiency, you can also get bonus points for the scalability of your implementations. For example, a `GET /:model` route has abstract enough architecture to easily add new filter params without a complete refactor of the service function would be significantly better than an implementation hard-coded around the 3 required params.
- Your api should have any routes needed for auxiliary support as you determine it. In addition, the API should have the following routes listed below.
- `GET /:model` route for each of the model types;
  - This route should use pagination and return the paginated documents along with the following links:
    - `next` - get the next x number of paginated documents
    - `prev` - get the previous x number of paginated documents
    - `first` - get the first x number of paginated documents
    - `last` - get the last x number of paginated documents
  - This route should also support the following params:
    - `olderThan {ISO}` - filter all documents created before this date
    - `newerThan {ISO}` - filter all documents created after this date
    - `count {Number}` - the number of documents per page to return. Should default to 10 and any number higher than 50 should still only return 50.
- `POST /:model` route for each of the model types to create a new model
  - This route should accept the necessary data to create a new document of the applicable model.
  - This route should also use API decoders to ensure the data is valid. We're fond of the `decoders` npm package, but feel free to pick the one you think is best.
  - This route should return the created model
- `DELETE /:id` route for each of the model types to delete the matching model

### Client

The client portion of this is just a single page. The page should have the following elements in some form:

- A widget to toggle between the 3 data models
- A widget for the user to specify the `olderThan`, `newerThan`, and `count` params if desired.
- A widget that displays the current models fetched from the server as attractive cards in a grid layout.
- Each model card should have a button to delete it from the DB. After a deletion, the UI should refetch the updated data.
- A widget with `First`, `Prev`, `Next`, and `Last` buttons to fetch more data. The data should be fetched and displayed using hooks with no page-reloads.
- A widget with a create button with a form for each type of model to allow a new model to be created.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open <http://localhost:3000> with your browser to see the result.

This app uses `next/font` to automatically optimize and load Inter, a custom Google Font.

## Handling Bugs

While we try our best to give you a starter template that is bug-free and leveraged for success, we understand that you may run into bugs while using this template. If so, please let us know the bugs you encounter so that we can patch them for future versions of this template. If you patch the bugs yourself, count that as bonus points! But also still let us know.

## Closing Notes

We greatly value engineers who are self-starting and can do their own research to get unstuck when possible. However, we are also trusting in your best judgement to know your limits, and reach out if you hit a problem you cannot unblock yourself on. We'll try our best to response promptly and help you out if there is blocker due to some assignment-design error on our part. That being said, we may choose not to give out answers to questions that could be answered by reading a technology's documentation, or due to a lack of fundamental understanding of Computer Science principles.

### Best of luck, and we look forward to seeing your app!