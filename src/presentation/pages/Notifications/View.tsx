"use client";

import {
  DashboardHeader,
  FormCheckbox,
  FormInput,
  FormRichTextInput,
  FormSelect,
  PrimaryButton,
} from "@/presentation/components";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from "@nextui-org/react";
import { genres, status } from "@/assets/constants";
import ViewModel from "./ViewModel";

const Notifications = () => {
  const { message, handleChange } = ViewModel();

  return (
    <>
      <DashboardHeader
        title="Notificaciones"
        description="Aquí podrás comunicarte con tus deportistas por medio de mensajes personalizados, puedes enviar mensajes a todos tus deportistas o a un grupo en específico."
      />

      <div className="flex w-full flex-col mt-5">
        <Tabs aria-label="Options" classNames={{ base: "dark" }}>
          <Tab key="compose" title="Componer">
            <Card className="p-3" classNames={{ base: "dark" }}>
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <h2 className="text-2xl text-white font-bold">
                    Nuevo Mensaje
                  </h2>
                  <p className="text-sm text-default-400">
                    Crea y envía una nueva notificación a los deportistas.
                  </p>
                </div>
              </CardHeader>
              <CardBody>
                <FormRichTextInput value={message} onChange={handleChange} />

                <FormCheckbox
                  label="Seleccionar todos"
                  selected={false}
                  customClassNames="mt-2"
                />

                <div className="flex flex-col gap-3 md:flex-row justify-between mt-5">
                  <FormInput
                    type="text"
                    label="Buscar por nombre"
                    labelPlacement="outside"
                    placeholder="Nombre del deportista"
                    customInputClass="mb-px"
                  />
                  <FormSelect
                    customInputClass="mt-5"
                    label="Estado"
                    labelPlacement="outside"
                    placeholder="Estado del deportista"
                    popoverProps={{ color: "foreground" }}
                    items={status}
                  />
                  <FormSelect
                    label="Sexo"
                    labelPlacement="outside"
                    placeholder="Sexo del deportista"
                    popoverProps={{ color: "foreground" }}
                    items={genres}
                  />
                </div>

                <p className="mt-3 text-white">Deportistas seleccionados</p>
                <div className="w-full h-40 overflow-auto border-2 border-[#4a5568] mt-1 rounded-md"></div>
              </CardBody>
              <CardFooter>
                <PrimaryButton
                  customButtonClass="w-full md:w-auto p-8"
                  text="Enviar Notificación"
                />
              </CardFooter>
            </Card>
          </Tab>
          <Tab key="records" title="Historial">
            <Card>
              <CardBody></CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default Notifications;
