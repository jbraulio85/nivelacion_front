import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useListFields } from "../../shared/hooks";
import { Navbar } from "../Navbar";
import { Footer } from "./Footer";
import { ReservationForm } from "./ReservationForm";
import toast from "react-hot-toast";

export const Fields = () => {
  const { fields, isLoading, error } = useListFields();
  const [open, setOpen] = useState(false);
  const [selectedField, setSelectedField] = useState(null);

  const handleClickOpen = (field) => {
    const userDetails = localStorage.getItem("user");
    
    if (userDetails) {
      setSelectedField(field);
      setOpen(true);
    } else {
      toast.error("Debes iniciar sesión para poder alquilar canchas.");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedField(null);
  };

  return (
    <div className="flex flex-col bg-slate-100 h-screen overflow-hidden">
      <Navbar className="fixed top-0 left-0 right-0 h-16" />
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col flex-1 items-center mt-8">
          <div className="flex flex-wrap justify-center gap-4">
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {fields &&
              fields.map((field) => (
                <Card
                  key={field._id}
                  sx={{ maxWidth: 345 }}
                >
                  <CardActionArea onClick={() => handleClickOpen(field)}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`https://res.cloudinary.com/dcrgnm3ud/image/upload/v123456789/${field.photo}`}
                      alt={field.fieldName}
                      style={{ objectFit: "cover" }}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        align="center"
                      >
                        {field.fieldName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <Typography
                          component="span"
                          style={{ fontWeight: "bold" }}
                        >
                          Gramilla:
                        </Typography>{" "}
                        {field.fieldType}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <Typography
                          component="span"
                          style={{ fontWeight: "bold" }}
                        >
                          Capacidad:
                        </Typography>{" "}
                        {field.capacity}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleClickOpen(field)}
                    >
                      Alquilar
                    </Button>
                  </CardActions>
                </Card>
              ))}
          </div>
        </div>
      </div>
      <Footer className="fixed bottom-0 left-0 right-0 h-16" />

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h6" align="center">
            Alquiler de canchas deportivas
          </Typography>
        </DialogTitle>
        <DialogContent>
          {selectedField && (
            <ReservationForm field={selectedField} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
