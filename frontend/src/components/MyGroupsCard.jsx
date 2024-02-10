import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Image, Button} from "@nextui-org/react";
import {Accordion, AccordionItem} from "@nextui-org/react";
import InviteToGroup from "./InviteToGroup";
import { UserContext } from "../store/userContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreateRecomendation from "./CreateRecomendation";
import AssignAsAdministrator from "./AssignAsAdministrator";


const MyGroupsCard = ({groups, updateData}) => {

    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["0"]));
    const navigate = useNavigate()
    const userCtx = useContext(UserContext)

    const redirectToGroup = (groupId) => { 
      navigate(`/group/${groupId}`)
    }

    const defaultContent =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

      return (
        <div className="min-h-screen">
            <div className="flex  flex-col mt-24 lg:mt-40 items-center justify-center gap-2 xl:gap-16 ">
                {groups.map((g, index) => (  
               
                        <Card key={index} className="w-auto">
                            <CardHeader className="flex gap-3 h-36"  style={{
                                    backgroundImage: `url(${g.groupPhoto})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",  
                                }}>
                                
                                <div className="flex flex-col justify-start items-start text-start">
                                   
                                </div>
                            </CardHeader>
                            <Divider/>
                                <CardBody className="h-auto flex items-center justify-center">             
                                    <div className="flex flex-col items-center jsutify-center gap-4">
                                        <div className="flex flex-col items-center">
                                            <p className="font-medium text-lg">{g.groupName}</p>
                                            <p className="text-small text-default-500">{g.creationDate}</p>
                                            <p className="text-small text-default-500">Created By: {g.creatorName}</p>
                                        </div>
                                        <div className="flex gap-4">
                                        <CreateRecomendation groupId={g._id}/>
                                        <Button color="secondary" variant="shadow" className="text-white cursor-pointer font-bold" onClick={() => redirectToGroup(g._id)}>Ir a las Recomendaciones del Grupo</Button>
                                        </div>
                                      
                                    </div>                                        
                                </CardBody>
                            <Divider/>
                            <Accordion>
                                <AccordionItem className="focus:ring-0" key={`${g.groupName}-verIntegrantes`} aria-label={`${g._id}-verIntegrantes`} title="Ver Integrantes">
                                {g.members.map((mem) => ( 
                                    <div className="flex flex-col mt-4 ">
                                        <div className=" flex justify-between items-center">
                                            <div className="flex items-center text-center justify-start gap-2">
                                                <img className="rounded-full h-8 w-8" src={mem.userProfileImage}/>
                                                <p>{mem.userName}</p>
                                            </div>
                                            <div className="flex justify-end items-center">
                                                <p className="text-sm font-medium text-zinc-500">{mem.userRolGroup}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                </AccordionItem>
                                <AccordionItem key={`${g.groupName}-invitarNuevoIntegrante`} aria-label={`${g._id}-invitarNuevoIntegrante`} title="Invitar nuevo Integrante">
                                    {g.members.some((mem) => mem.userId === userCtx.userId && mem.userRolGroup === "Admin") ? (
                                        <div>
                                            <p className="text-sm text-zinc-500">Debido a que eres administrador, puedes invitar más integrantes!</p>
                                            <InviteToGroup type={"admin"} groupData={g} />
                                        </div>
                                        ) : (
                                        <div>
                                            <p className="text-sm text-zinc-500">Debes ser administrador del grupo para poder invitar a integrantes</p>
                                            <InviteToGroup type={"member"} groupData={g} />
                                        </div>
                                        )}
                                    </AccordionItem>  
                                            {g.members.some((mem) => mem.userId === userCtx.userId && mem.userRolGroup === "Admin") ? (
                                                    <AccordionItem  key={`${g.groupName}-InvitacionesPendientes`} aria-label={`${g._id}-InvitacionesPendientes`} title="Asignar nuevo Administrador">
                                                    {g.members.filter((mem) => mem.userId !== userCtx.userId && mem.userRolGroup !== "Admin").map((mem) => ( 
                                                        <div className="flex flex-col mt-4 ">
                                                            <div className=" flex justify-between items-center">
                                                                <div className="flex items-center text-center justify-start gap-2">
                                                                    <img className="rounded-full h-8 w-8" src={mem.userProfileImage}/>
                                                                    <p>{mem.userName}</p>
                                                                </div>
                                                                <div className="flex justify-end items-center">
                                                                    <p className="text-sm font-medium text-zinc-500"><AssignAsAdministrator updateGroupData={updateData} userId={mem.userId} groupData={g} userName={mem.userName}/></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                            ))}
                                        </AccordionItem>
                                    ) : (  null
                                    )}
                            </Accordion>
                        </Card>
                
                ))}
            </div>
        </div>
      
    );
}

export default MyGroupsCard


