import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { CreditCard, Podcast, Settings, WandSparkles } from "lucide-react";
import { Button } from "../ui/button";
import { FaRobot } from "react-icons/fa";

const QuickActions = () => {
  return (
    <Card className="flex flex-1 flex-col bg-lime-500/10 border-lime-500/20 text-white">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 justify-between">
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

        <Link href="/settings">
          <Button className="w-full bg-lime-500/20 hover:bg-lime-500/30">
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
