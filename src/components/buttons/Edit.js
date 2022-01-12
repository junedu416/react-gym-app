import EditIcon from '@mui/icons-material/Edit';
import BasicButton from "./BasicButton";

const EditButton = (props) => {
  const { btnFunction, sx } = props;
  return (
    <BasicButton
      variant="text"
      onClick={btnFunction}
      style={{
        color: "grey",
        border: "none",
        display: "flex",
        flexDirection: "column",
        borderRadius: "100%",
        alignSelf: `${props.align ? props.align : "flex-end"}`,
      }}
    >
      <EditIcon sx={{ ...sx }}/>
      <p style={{color: "lime", margin: "0"}}>edit</p>
    </BasicButton>
  );
};

export default EditButton;
