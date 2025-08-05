import { Button } from "@/components/ui/button";
import { MessageCircle, Smartphone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const StonksLanding = () => {
  const navigate = useNavigate();

  function handleRouteChange() {
    navigate("/simli-agent");
  }

  return (
    <div className="h-screen bg-gradient-hero text-foreground overflow-hidden flex flex-col">
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-1 px-8 relative">
        {/* ✅ Fixed Background Elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary rounded-full blur-3xl animate-glow-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-primary rounded-full blur-3xl animate-glow-pulse delay-1000"></div>
        </div>

        {/* App Logo/Avatar */}
        <div className="relative mb-12 animate-scale-in">
          <div className="w-40 h-40 bg-card rounded-3xl p-4 shadow-glow mx-auto border border-border/20">
            <img
              src="/lovable-uploads/a06718bb-ca5f-400d-aa9f-c24999d5dcdf.png"
              alt="Stonks Real-time Agent"
              className="w-full h-full object-contain rounded-3xl "
            />
          </div>
        </div>

        {/* App Title */}
        <div className="text-center mb-16 animate-fade-up">
          <h1 className="text-7xl md:text-8xl font-black tracking-tight mb-6 text-foreground">
            STONKS
          </h1>
          <p className="text-xl text-muted-foreground font-medium mb-4">
            Your real-time AI agent & personal assistant
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-6 w-full max-w-sm animate-fade-up delay-200">
          <Button
            onClick={handleRouteChange}
            variant="default"
            size="xl"
            className="w-full group h-16 text-xl font-bold"
          >
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform mr-3" />
            Talk to Stonks
          </Button>

          {/* ✅ Optional Fix: Avoid nesting <Button> inside <Link> */}
          <Button
            asChild
            variant="secondary"
            size="xl"
            className="w-full group h-16 text-xl font-bold"
          >
            <Link to="/">
              <Smartphone className="w-6 h-6 group-hover:scale-110 transition-transform mr-3" />
              Quick Demo
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StonksLanding;
