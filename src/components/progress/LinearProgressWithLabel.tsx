import { Box, Typography } from '@material-ui/core';
import LinearProgress, {
  LinearProgressProps,
} from '@material-ui/core/LinearProgress';

type LinearProgressWithLabelProps = {
  value: number;
} & LinearProgressProps;

export default function LinearProgressWithLabel(
  props: LinearProgressWithLabelProps
) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress
          variant={props.value === -1 ? 'indeterminate' : 'determinate'}
          {...props}
        />
      </Box>
      <Box minWidth={35} style={{ marginLeft: '10px' }}>
        <Typography variant="body2" color="textSecondary">
          {props.value === -1 ? 'Pending' : `${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}
