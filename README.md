# CIVL1160 Old Hong Kong Database

Built upon: https://github.com/pkcwong/meteor-react-starter

> A starter repo to building a web application with ReactJS, using the MeteorJS framework. For mobile app development, check this other [project](https://github.com/pkcwong/react-native-meteor-starter.git), compatible with this starter repo.
>
> More resource may be found in the [wiki](https://github.com/pkcwong/meteor-react-starter/wiki).

### Prerequisites and Installation

Install the following frameworks and packages: [NodeJS](https://nodejs.org/en/) + [MeteorJS Framework](https://www.meteor.com/install)

Verify the installation.

```bash
    node --version
    npm --version
    meteor --version
```

### Build

In Shell, clone this repository:

```bash
git clone https://github.com/HarryHo90sHK/civl1160-19summer-proj.git
cd civl1160-19summer-proj
meteor npm install
meteor
```

In Shell, run Mongo within Meteor:

```bash
meteor mongo
```

Then, within your local server create the following MongoDB View:

```js
db.createView('blogs_extract', 'blogs', 
    [{
        $addFields: {
            "quillextr": {
                $substrCP: ["$quill", 0, 1000]
            },
			"quillelli": {
				$gt: [{$strLenCP: "$quill"}, 1000]
			},
			quill: 0
        }
    }]);
```

### Deployment

Deploy `master` on [Heroku](https://dashboard.heroku.com/). 

Also, refer to mLab's manual to create the MongoDB View `blogs_extract`. Usually, you can install a MongoDB client on Linux using `sudo apt install mongodb-client`, and then connect to your Heroku mLab MongoDB using the shell: 

```bash
mongo ds145245.mlab.com:45245/<database-name> -u <database-username> -p <database-password>
```

### Miscellaneous

#### Manage MongoDB

To manage your online MongoDB, you can use command-line tools such as `mongodb-client`, or GUI tools such as [Robo 3T](https://robomongo.org/download). Common functions include viewing, updating and removing documents.

### Contributing

- Christopher Wong [@pkcwong](https://github.com/pkcwong)
- Harry Ho [@HarryHo90sHK](https://github.com/HarryHo90sHK)
