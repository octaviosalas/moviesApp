import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button} from "@nextui-org/react";
import {Accordion, AccordionItem} from "@nextui-org/react";
import InviteToGroup from "./InviteToGroup";

const MyGroupsCard = ({groups}) => {

    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["0"]));

    const defaultContent =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

      return (
        <div className="min-h-screen">
            <div className="flex mt-24 lg:mt-40  items-center justify-center gap-2 xl:gap-16">
                {groups.map((g, index) => (   
                    <Card key={index} className="max-w-[500px] ">
                        <CardHeader className="flex gap-3">
                            <img  className="rounded-full h-16 w-16"    src={g.groupPhoto}/>
                            <div className="flex flex-col">
                                <p className="text-lg">{g.groupName}</p>
                                <p className="text-small text-default-500">{g.creationDate}</p>
                            </div>
                        </CardHeader>
                        <Divider/>
                            <CardBody>
                            <p>Make beautiful websites regardless of your design experience.</p>
                            </CardBody>
                        <Divider/>
                        <Accordion>
                            <AccordionItem key={`${g.groupName}-verIntegrantes`} aria-label={`${g._id}-verIntegrantes`} title="Ver Integrantes">
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
                                  {g.members.map((mem) => mem.userRolGroup === "Admin" ?
                                        <div>
                                            <p className="text-sm text-zinc-500" >Debido a que eres administrador, puedes invitar mas integrantes!</p>
                                            <InviteToGroup type={"admin"} groupData={g}/>
                                        </div>
                                    :
                                       <div>
                                            <p className="text-sm text-zinc-500" >Debes ser Administardor del grupo para poder ser Integrante</p>
                                            <InviteToGroup type={"member"} groupData={g}/>
                                        </div>
                                    )}
                            </AccordionItem>  
                               {g.members.map((mem) => 
                                 mem.userRolGroup === "Admin" ? (
                                    <AccordionItem  key={`${g.groupName}-InvitacionesPendientes`} aria-label={`${g._id}-InvitacionesPendientes`} title="Invitaciones Pendientes">
                                       <p>aa</p>
                                    </AccordionItem>
                                ) : null
                                )}
                        </Accordion>
                    </Card>
                ))}
            </div>
        </div>
      
    );
}

export default MyGroupsCard


