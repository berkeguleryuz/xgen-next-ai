import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { CreditCard, Podcast, WandSparkles } from "lucide-react";
import { Button } from "../ui/button";
import { FaRobot } from "react-icons/fa";

const QuickActions = () => {
  return (
    <Card className="bg-lime-500/10 border-lime-500/20 text-white">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardDescription>
        Generate images with the latest models and styles.
      </CardDescription>
      <CardContent className="grid gap-4">
        <Link href="/image-generation">
          <Button className="w-full bg-lime-500/20 hover:bg-lime-500/30">
            <WandSparkles className="w-4 h-4" />
            Generate Image
          </Button>
        </Link>

        <Link href="/post-generator">
          <Button className="w-full bg-lime-500/20 hover:bg-lime-500/30">
            <Podcast className="w-4 h-4" />
            Generate Post
          </Button>
        </Link>

        <Link href="/train-model">
          <Button className="w-full bg-lime-500/20 hover:bg-lime-500/30">
            <FaRobot className="w-4 h-4" />
            Train New Model
          </Button>
        </Link>

        <Link href="/subscriptions">
          <Button className="w-full bg-lime-500/20 hover:bg-lime-500/30">
            <CreditCard className="w-4 h-4" />
            Subsciptions
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
