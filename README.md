# Membrain

Insane in the membrane insane in the brain!!!

An application that stores small private documents for your future self in an end to end encrypted data store, which is password protected. The store is your personal store, there is no sharing or ability to access by any other means than your username and password.

The application allows the user to create 500 character documents with a name and description and tags to organize the documents. The documents can be markdown, but no scripts or style tags, just plain markdown text.

Common use cases, to store information that you may forget over time and be able to retrieve that information when needed. The app encrypts the data in the browser and stores the data encrypted at rest in a datastore in the cloud, and can only be un-encrypted by the private and public key stored in your account, the only way to get access is by username and password.

Use at your own will.

## Usage


## Development Setup

You will need a key from userbase.com and store the key in the .env file as API_ID

at the command line:

``` sh
yarn
yarn dev
```

open a browser on port:5000

## Testing


