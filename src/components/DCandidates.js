import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import * as actions from "../actions/dCandidate";
import { Grid, Paper, TableCell, TableRow,TableContainer, ButtonGroup, Button, Table, TableHead, TableBody, withStyles } from "@material-ui/core";
import DCandidateForm from "./DCandidateForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { act } from "react-dom/test-utils";
import { useToasts } from "react-toast-notifications";

const styles = theme =>({
    root: {
        "& .MuiTableCell-head":{
            fontSize:"1.25rem",
            fontFamily: "Lato"
        }
    },
    paper :{
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})


const DCandidates = ({classes, ...props}) => {
     const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllDCandidates()
    }, [])//componentDidMount

    const{addToast} = useToasts()

    const onDelete = id => {
        if(window.confirm('Are you sure to delete this record?'))
            props.deleteDCandidate(id, ()=>addToast("Deleted successfuly", {appearance: 'info'}))
    }

    return(
        <Paper className={classes.paper} elevation={3} >        
         <Grid container>
            <Grid item xs ={6}>
                <DCandidateForm {...({ currentId, setCurrentId })} />
            </Grid>

            <Grid item xs ={6}>
               <TableContainer>
                   <Table>
                       <TableHead className={classes.root}>
                           <TableRow>
                               <TableCell>Name</TableCell>
                               <TableCell>Mobile</TableCell>
                               <TableCell>Blood Group</TableCell>
                               <TableCell></TableCell>
                           </TableRow>
                       </TableHead>
                       <TableBody>
                           {
                               props.dCandidateList.map((record,index)=>{
                               return(<TableRow key={index} hover>
                                   <TableCell>{record.fullName}</TableCell>
                                   <TableCell>{record.mobile}</TableCell>
                                   <TableCell>{record.bloodGroup}</TableCell>
                                   <TableCell>
                                       <ButtonGroup variant="text">
                                           <Button>
                                               <EditIcon color="primary"
                                               onClick={() => {setCurrentId(record.id)}} />
                                            </Button>
                                           <Button>
                                               <DeleteIcon color="secondary"
                                               onClick={() => onDelete(record.id)}
                                               />
                                            </Button>
                                       </ButtonGroup>
                                   </TableCell>
                               </TableRow>)
                               })
                           }
                       </TableBody>
                   </Table>
               </TableContainer>
            </Grid>

        </Grid>
        </Paper>
    );
}

const mapStateToprops = state=>({
    
        dCandidateList:state.dCandidate.list
  
})

const mapActionToProps = {
    fetchAllDCandidates: actions.fetchAll,
    deleteDCandidate: actions.Delete
}


export default connect(mapStateToprops, mapActionToProps)(withStyles(styles)(DCandidates));
