import AcUnitIcon from '@mui/icons-material/AcUnit';
import DeskIcon from '@mui/icons-material/Desk';
import BedIcon from '@mui/icons-material/Bed';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import ShowerIcon from '@mui/icons-material/Shower';
import TvIcon from '@mui/icons-material/Tv';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import KitchenIcon from '@mui/icons-material/Kitchen';
import BalconyIcon from '@mui/icons-material/Balcony';
import CountertopsIcon from '@mui/icons-material/Countertops';
import VideocamIcon from '@mui/icons-material/Videocam';
import GroupsIcon from '@mui/icons-material/Groups';

// Features in PG, Apartment, Hostel
let features = ["AC","Table", "Bed","Geyser","Fridge","Laundary","TV","Wifi","CCTV","Security","Parking","Kitchen","Balcony"];
// Make a object of features and their icons
let featureIcon = {
  "AC":<AcUnitIcon sx={{ fontSize: "2.5rem" }} />,
  "Table":<DeskIcon sx={{ fontSize: "2.5rem" }} />,
  "Bed":<BedIcon sx={{ fontSize: "2.5rem" }} />,
  "Geyser":<ShowerIcon sx={{ fontSize: "2.5rem" }} />,
  "Fridge":<KitchenIcon sx={{ fontSize: "2.5rem" }} />,
  "Laundary":<LocalLaundryServiceIcon sx={{ fontSize: "2.5rem" }} />,
  "TV":<TvIcon sx={{ fontSize: "2.5rem" }} />,
  "Wifi":<WifiIcon sx={{ fontSize: "2.5rem" }} />,
  "CCTV":<VideocamIcon sx={{ fontSize: "2.5rem" }} />,
  "Security":<GroupsIcon sx={{ fontSize: "2.5rem" }} />,
  "Parking":<LocalParkingIcon sx={{ fontSize: "2.5rem" }} />,
  "Kitchen":<CountertopsIcon sx={{ fontSize: "2.5rem" }} />,
  "Balcony":<BalconyIcon sx={{ fontSize: "2.5rem" }}/>
};

export {features,featureIcon};