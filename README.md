# Facial Recognition Database Management System

## Introduction
Facial Recognition Database Management System (FRDMS) is a facial recognition system made for everyone. 

Powered by python, dlib and react, and packaged into a single executable that can be used by anyone with zero dependencies required.


## Features
### Facial Recognition 
Find a face match by supplying an input image, and the system will search the database to locate possible matches

### Web Crawling 
Launch web crawling workers to craw through social platforms for images and profiles

### Personnel Classification
Face profiles can be classified into multiple groups using supervised or unsupervised machine learning models

### Automatic Profile Creation
Supply large amount of unlabelled images into the system to be classified by person.
New unnamed profile can be created automatically when input photo fail to match any existing profiles
Data crawled from social medias will be used to populate newly created profile as much as possible.

### Live Video Recognition
Identify known faces in the database from a live video


## Setup Development Environment
Server
```
conda env create -f environment.yml -n face
conda activate face
python app.py
```

Client
```
cd client
yarn install
yarn start
```
