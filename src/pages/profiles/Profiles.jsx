import { useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Tooltip, IconButton, Switch } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import DataTable from '../../components/DataTable/DataTable';
import Image from '../../components/images/Image';
import Gallery from '../../components/images/Gallery';
import useProfiles from '../../hooks/useProfiles';
import SelectToolbar from '../../components/SelectToolbar';

const headCells = [
  {
    id: 'thumbnail',
    label: '',
    padding: 'checkbox',
    render: (value) => {
      const image = value
        ? {
            source: `/api/image/${value.photo.id}`,
          }
        : null;
      return (
        <Grid style={{ margin: '10px' }}>
          <Image image={image} height={50} />
        </Grid>
      );
    },
  },
  { id: 'id', label: 'id' },
  { id: 'name', label: 'Name' },
  {
    id: 'facesCount',
    label: 'Face Count',
  },
];

const Profiles = () => {
  const history = useHistory();
  const [profiles, refetchProfiles, profilesCount] = useProfiles(1, 10);
  const [isGalleryView, setIsGalleryView] = useState(false);
  const [selected, setSelected] = useState([]);

  const handleGallerySwitch = (event) => {
    setIsGalleryView(event.target.checked);
  };

  const toolBarButtons = [
    <Switch checked={isGalleryView} onChange={handleGallerySwitch} />,
  ];

  const toolBarSelectedButtons = [
    <Tooltip title="Delete">
      <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </Tooltip>,
  ];

  const ToolBar = ({ selectedItems, onCheckAll }) => {
    return (
      <SelectToolbar
        enableCheckAll={isGalleryView}
        title="Profiles"
        selectedButtons={toolBarSelectedButtons}
        buttons={toolBarButtons}
        numSelected={selectedItems.length}
        checked={selectedItems.length > 0}
        indeterminate={selectedItems.length !== profiles.length}
        onCheckAll={onCheckAll}
      />
    );
  };

  const getImages = (profiles) => {
    return profiles.map((profile) => ({
      source: profile.thumbnail
        ? `/api/image/${profile.thumbnail.photo.id}`
        : null,
      id: profile.id,
    }));
  };

  const images = useMemo(() => getImages(profiles), [profiles]);

  const handleSelect = (selected) => {
    setSelected([...selected]);
  };

  const handleDoubleClick = (row) => {
    history.push(`/profile?id=${row.id}`);
  };

  return (
    <>
      {isGalleryView ? (
        <Gallery
          images={images}
          count={profilesCount}
          onChange={refetchProfiles}
          onSelect={handleSelect}
          defaultRowsPerPage={10}
          ToolBar={ToolBar}
        />
      ) : (
        <DataTable
          title="Profiles"
          data={profiles}
          dataCount={profilesCount}
          refetch={refetchProfiles}
          onSelect={handleSelect}
          onDoubleClick={handleDoubleClick}
          headCells={headCells}
          ToolBar={ToolBar}
        />
      )}
    </>
  );
};

export default Profiles;
