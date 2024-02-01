import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Image,
} from "@nextui-org/react";
import NextImage from "next/image";

export default function about() {
  return (
    <main className="flex flex-col items-center">
      <Card className="max-w-md p-2">
        <CardHeader>
          <div className=" text-xl font-bold">
            That's the team behind GooseChef:
          </div>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="flex flex-col">
            <span>Tobias Messner</span>
            <span>Deniz Gazitepe</span>
            <span>Robin Schmidt</span>
            <span>Sabrina Turni</span>
            <span>Elena Roller</span>
            <Image
              as={NextImage}
              width={300}
              height={300}
              priority
              src="/images/GooseChef.png"
              alt="Logo"
              className="h-120 w-120 mb-2 ml-5 flex flex-col items-center object-contain md:block"
            />
          </div>

          <div className="font-semibold">
            <p>
              This project was made for the software development 3 class at
              Hochschule der Medien Stuttgart.
            </p>
          </div>
        </CardBody>
        <CardFooter>
          <Chip className="mr-5">#studentwork</Chip>
          <Chip className="mr-5">#team</Chip>
          <Chip className="mr-5">#HdM</Chip>
          <Chip>#aboutUs</Chip>
        </CardFooter>
      </Card>
    </main>
  );
}
