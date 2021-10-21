import React, { useEffect, useState } from 'react';
import {
  Grid,
  IconButton,
  Snackbar,
  Box,
  TablePagination,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Image from './Image';
import { DELETE_PHOTOS as DELETE_PHOTOS_GQL_M } from '../../graphql/mutation';
import { graphqlQuery } from '../../graphql';
import { ContextMenuProvider } from '../context/MenuContext';
import SelectToolbar from '../SelectToolbar';

const Gallery = ({ images, count, onChange }) => {
  const [selected, setSelected] = useState([]);
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState(null);
  const [imgHash, setImgHash] = useState(Date.now());
  const [options, setOptions] = useState({
    page: 3,
    rowsPerPage: 10,
  });

  const handleCheckImage = (_id) => {
    var newSelected = selected.slice();
    if (newSelected.includes(_id)) {
      const index = newSelected.indexOf(_id);
      if (index > -1) {
        newSelected.splice(index, 1);
      }
      setSelected(newSelected);
    } else {
      newSelected.push(_id);
      setSelected(newSelected);
    }
  };

  const handleCheckAll = () => {
    if (selected.length !== images.length) {
      setSelected(images.map((image) => image.id));
    } else {
      setSelected([]);
    }
  };

  const handleDeleteSelected = () => {
    graphqlQuery(DELETE_PHOTOS_GQL_M, { ids: selected }).then((res) => {
      const deletedImgs = res.deletePhoto;

      setSelected([]);
      setOpenDeleteSnackbar(true);
      setDeleteMsg(`${deletedImgs.length} images deleted`);
      setImgHash(Date.now());

      onChange(options.page, options.rowsPerPage);
    });
  };

  const handleSingleDelete = (id) => {
    graphqlQuery(DELETE_PHOTOS_GQL_M, { ids: [id] }).then((res) => {
      const deletedImgs = res.deletePhoto;

      setSelected(selected.filter((item) => item !== id));
      setOpenDeleteSnackbar(true);
      setDeleteMsg(`${deletedImgs.length} images deleted`);
      setImgHash(Date.now());

      onChange(options.page, options.rowsPerPage);
    });
  };

  const handleCloseDeleteSnackbar = () => {
    setOpenDeleteSnackbar(false);
  };

  const renderSelectOption = (id) => {
    if (id) {
      return selected.includes(id) ? 'Unselect' : 'Select';
    }
    return 'Select';
  };

  const handlePageChange = (event, newPage) => {
    setOptions({ ...options, page: newPage });
  };

  const handleRowsPerPageChange = (event) => {
    setOptions({
      ...options,
      rowsPerPage: parseInt(event.target.value, 10),
    });
  };

  useEffect(() => {
    onChange(options.page, options.rowsPerPage);
    window.scrollTo(0, 0);
  }, [options, onChange]);

  const contextMenuOptions = [
    {
      name: 'select-option',
      renderName: (id) => renderSelectOption(id),
      action: handleCheckImage,
    },
    {
      name: 'delete-option',
      renderName: () => 'Delete',
      action: handleSingleDelete,
    },
  ];

  return (
    <>
      <SelectToolbar
        numSelected={selected.length}
        onDelete={handleDeleteSelected}
        enableCheckAll
        checked={selected.length > 0}
        indeterminate={selected.length !== images.length}
        onCheckAll={handleCheckAll}
        title="Gallery"
      />
      <ContextMenuProvider options={contextMenuOptions}>
        <Box display="flex" justifyContent="center">
          <Grid
            container
            spacing={2}
            justifyContent="center"
            style={{ margin: '16px' }}
          >
            {images &&
              images.map((image, index) => (
                <Grid key={index} item>
                  <Image
                    image={image}
                    imgHash={imgHash}
                    height={290}
                    href={`/facial-recognition?id=${image.id}`}
                    onCheck={handleCheckImage}
                    redirect={selected.length === 0}
                    hover
                    selected={selected.includes(image.id)}
                    selectMode={selected.length > 0}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={openDeleteSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseDeleteSnackbar}
          message={deleteMsg}
          action={
            <>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseDeleteSnackbar}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          }
        />
      </ContextMenuProvider>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30, 50, 100]}
        component="div"
        count={count}
        rowsPerPage={options.rowsPerPage}
        page={options.page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </>
  );
};

export default Gallery;
