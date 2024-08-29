import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { useListFields } from "../../hooks/useListFields";

export const Fields = () => {
  const { fields, isLoading, error } = useListFields();

  return (
    <div className="flex flex-col bg-slate-100 h-screen overflow-hidden">
      <Navbar className="fixed top-0 left-0 right-0 h-16" />
      <div className="flex-1 overflow-auto">
        <div className="flex flex-col flex-1 items-center mt-8">
          <div className="flex flex-wrap justify-center gap-4">
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {fields &&
              fields.map((field) => (
                <Card 
                  key={field._id}
                  sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`https://res.cloudinary.com/dcrgnm3ud/image/upload/v123456789/${field.photo}`}
                      alt={field.fieldName}
                      style={{objectFit: "cover"}}
                    />
                    <CardContent>
                      <Typography
                         gutterBottom 
                         variant="h5" 
                         component="div"
                        >
                        {field.fieldName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <Typography component="span" style={{fontWeight: "bold"}}>
                          Gramilla:
                        </Typography> {" "}
                          {field.fieldType}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <Typography component="span" style={{fontWeight: "bold"}}>
                          Capacidad:
                        </Typography> {" "}
                          {field.capacity}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions sx={{justifyContent: "center"}}>
                    <Button size="small" color="primary">
                      Alquilar esta cancha
                    </Button>
                  </CardActions>
                </Card>
              ))}
          </div>
        </div>
      </div>
      <Footer className="fixed bottom-0 left-0 right-0 h-16" />
    </div>
  );
};
