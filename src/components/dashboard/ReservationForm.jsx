import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import { useReservation } from "../../shared/hooks";

export const ReservationForm = ({ field }) => {
  const [formData, setFormData] = useState({
    fieldId: "",
    uid: "",
    startTime: "",
    endTime: "",
    payment: null,
  });

  const [selectedFileName, setSelectedFileName] = useState(""); // Estado para el nombre del archivo

  const { createReservation, isLoading } = useReservation();

  useEffect(() => {
    const userDetails = localStorage.getItem("user");
    if (userDetails) {
      const { uid, username } = JSON.parse(userDetails);
      setFormData((prevData) => ({
        ...prevData,
        uid,
        username,
      }));
    }

    if (field) {
      setFormData((prevData) => ({
        ...prevData,
        fieldId: field._id,
      }));
    }
  }, [field]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      payment: file,
    });
    setSelectedFileName(file ? file.name : ""); // Actualiza el nombre del archivo
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    await createReservation(
      formData.fieldId,
      formData.uid,
      formData.startTime,
      formData.endTime,
      formData.payment
    );
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      sx={{ p: 2 }}
    >
      <TextField
        name="fieldName"
        label="Field Name"
        variant="outlined"
        value={field?.fieldName || ""}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        disabled
      />
      <TextField
        name="username"
        label="Username"
        variant="outlined"
        value={formData.username || ""}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        disabled
      />
      <TextField
        name="startTime"
        label="Start Time"
        variant="outlined"
        value={formData.startTime}
        onChange={handleChange}
        type="datetime-local"
        required
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name="endTime"
        label="End Time"
        variant="outlined"
        value={formData.endTime}
        onChange={handleChange}
        type="datetime-local"
        required
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Input
        accept="image/*"
        id="upload-payment"
        type="file"
        onChange={handleFileChange}
        sx={{ display: "none" }}
      />
      {selectedFileName && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          Archivo seleccionado: {selectedFileName}
        </Typography>
      )}
      <div>
        <label htmlFor="upload-payment" className="mr-8">
          <Button
            variant="contained"
            color="primary"
            component="span"
            sx={{ mt: 2 }}
          >
            Upload Payment
          </Button>
        </label>

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ mt: 2 }}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </Box>
  );
};

ReservationForm.propTypes = {
  field: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    fieldName: PropTypes.string,
    fieldType: PropTypes.string,
    capacity: PropTypes.string,
    photo: PropTypes.string,
  }).isRequired,
};
