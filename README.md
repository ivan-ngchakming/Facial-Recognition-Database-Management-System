# Facial Recognition Database Management System
Note: This project is current being developed.

## Introduction
Facial Recognition Database Management System (FRDMS) is a facial recognition system made for everyone. 

Powered by python, dlib and react, and packaged into a single executable that can be used by anyone with zero dependencies required.

![Demo](./docs/demo.gif)

## Pages
### Facial Recognition
![Facial Recognition](./docs/rec.png)

### Images
![Images](./docs/images.png)

### Upload Image
![Upload Images](./docs/upload.png)

## Features
### Facial Recognition (In-progress)
Find a face match by supplying an input image, and the system will search the database to locate possible matches

1. face identification

    Classifies a face to a specific identity selected from existing profile in the database

2. face verification (In-progress)

    Determine whether a pair of faces belongs to the same identity
    so un-identified faces can be grouped together

### Web Crawling (In-progress)
Launch web crawling workers to craw through social platforms for images and profiles

### Personnel Classification (In-progress)
Face profiles can be classified into multiple groups using supervised or unsupervised machine learning models

### Automatic Profile Creation (In-progress)
Supply large amount of unlabelled images into the system to be classified by person.
New unnamed profile can be created automatically when input photo fail to match any existing profiles
Data crawled from social medias will be used to populate newly created profile as much as possible.

### Live Video Recognition (In-progress)
Identify known faces in the database from a live video


## Setup Development Environment
Server
```
pipenv install
pipenv run python app.py
```

Client
```
cd client
yarn install
yarn start
```
