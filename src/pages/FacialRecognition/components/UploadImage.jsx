import React, { useCallback, useState } from 'react';
import { Button, IconButton, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDropzone } from 'react-dropzone';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
  root: {},
  inputBox: {
    display: 'flex',
  },
  input: {
    marginRight: theme.spacing(2),
  },
  btn: {
    margin: theme.spacing(2, 1, 2, 1),
    minWidth: '100px',
  },
  imgPreviewWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '5%',
  },
  imgPreviewDiv: {
    display: 'inline-block',
    position: 'relative',
  },
  imgPreview: {
    maxHeight: '50vh',
    borderRadius: '1%',
  },
  closeImgBtn: {
    position: 'absolute',
    top: '-3%',
    right: '-5%',
    background: theme.palette.white,
    '&:hover': {
      background: theme.palette.white,
      color: '#f00',
    },
  },
  fileBrowser: {
    borderStyle: 'dashed',
    borderWidth: '2px',
    borderRadius: '2px',
    backgroundColor: theme.palette.white,
    margin: theme.spacing(0, 2, 0, 2),
    padding: theme.spacing(20, 0, 20, 0),
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.text.secondary,
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

export default function UploadImage({ uploadImage }) {
  const classes = useStyles();
  const [imgFile, setImgFile] = useState(null);
  const [image, setImage] = useState(null);

  const uploadNewImage = () => {
    // callback
    uploadImage(imgFile);
  };

  const onDrop = useCallback((acceptedFiles) => {
    console.log('File received', acceptedFiles);
    const file = acceptedFiles[0];
    setImgFile(file);
    const imgURLObj = URL.createObjectURL(file);
    setImage(imgURLObj);
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
  });

  const clearImgFile = () => {
    setImgFile(null);
    setImage(null);
  };

  return (
    <div className={classes.root}>
      <div className={classes.inputBox}>
        <TextField
          id="standard-full-width"
          placeholder="Enter Image file's full local path or URL"
          fullWidth
          margin="normal"
          className={classes.input}
        />

        <Button
          onClick={uploadNewImage}
          variant="contained"
          disabled={!imgFile}
          className={classes.btn}
        >
          Run
        </Button>

        {image ? (
          <Button
            onClick={clearImgFile}
            variant="contained"
            className={classes.btn}
          >
            Clear
          </Button>
        ) : (
          <Button onClick={open} variant="contained" className={classes.btn}>
            Browse
          </Button>
        )}
      </div>
      {image ? (
        <div className={classes.imgPreviewWrapper}>
          <div className={classes.imgPreviewDiv}>
            <img
              alt="Preview of user uploaded file"
              className={classes.imgPreview}
              src={image}
            />
            <IconButton
              onClick={clearImgFile}
              size="small"
              className={classes.closeImgBtn}
            >
              <ClearIcon />
            </IconButton>
          </div>
        </div>
      ) : (
        <Paper
          className={classes.fileBrowser}
          variant="outlined"
          square
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <p>Or UPLOAD files by dropping the files here</p>
        </Paper>
      )}
    </div>
  );
}
