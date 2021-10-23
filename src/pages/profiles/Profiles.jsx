import React from 'react';
import { Grid } from '@material-ui/core';
import DataTable from '../../components/DataTable/DataTable';
import Image from '../../components/images/Image';
import useProfiles from '../../hooks/useProfiles';

const headCells = [
  {
    id: 'thumbnail',
    label: '',
    padding: 'checkbox',
    render: (value) => (
      <Grid style={{ margin: '10px' }}>
        <Image
          image={{
            source: `/api/image/${value.photo.id}`,
          }}
          height={50}
        />
      </Grid>
    ),
  },
  { id: 'id', label: 'id' },
  { id: 'name', label: 'Name' },
  {
    id: 'facesCount',
    label: 'Face Count',
  },
];

const Profiles = () => {
  const [profiles, refetchProfiles, profilesCount] = useProfiles(1, 10);

  return (
    <>
      <DataTable
        title="Profiles"
        data={profiles}
        dataCount={profilesCount}
        refetch={refetchProfiles}
        headCells={headCells}
      />
    </>
  );
};

export default Profiles;
