import Heading from "@/app/components/Heading";

const Star = () => {
  return (
    <>
      <div className="mb-5">
        <Heading title="Reviews" />
      </div>
      <div className="grid grid-cols-2 gap-x-10 gap-y-5 tracking-wide">
        <div className="flex flex-row justify-between">
          <div>Cleanliness</div>
          <div className="flex flex-row gap-3 items-center relative">
            <div className="relative">
              <div className="w-[120px] h-[4px] bg-neutral-200 rounded-full" />
              <div className="absolute w-[90px] h-[4px] bg-neutral-950 rounded-full left-0 top-0" />
            </div>
            <span>4.7</span>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div>Communication</div>
          <div className="flex flex-row gap-3 items-center relative">
            <div className="relative">
              <div className="w-[120px] h-[4px] bg-neutral-200 rounded-full" />
              <div className="absolute w-[110px] h-[4px] bg-neutral-950 rounded-full left-0 last:top-0" />
            </div>
            <span>4.9</span>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div>Check-in</div>
          <div className="flex flex-row gap-3 items-center relative">
            <div className="relative">
              <div className="w-[120px] h-[4px] bg-neutral-200 rounded-full" />
              <div className="absolute w-[100px] h-[4px] bg-neutral-950 rounded-full left-0 top-0" />
            </div>
            <span>4.8</span>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div>Accuracy</div>
          <div className="flex flex-row gap-3 items-center relative">
            <div className="relative">
              <div className="w-[120px] h-[4px] bg-neutral-200 rounded-full" />
              <div className="absolute w-[100px] h-[4px] bg-neutral-950 rounded-full left-0 top-0" />
            </div>
            <span>4.8</span>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div>Location</div>
          <div className="flex flex-row gap-3 items-center relative">
            <div className="relative">
              <div className="w-[120px] h-[4px] bg-neutral-200 rounded-full" />
              <div className="absolute w-[100px] h-[4px] bg-neutral-950 rounded-full left-0 top-0" />
            </div>
            <span>4.8</span>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div>Value</div>
          <div className="flex flex-row gap-3 items-center relative">
            <div className="relative">
              <div className="w-[120px] h-[4px] bg-neutral-200 rounded-full" />
              <div className="absolute w-[100px] h-[4px] bg-neutral-950 rounded-full left-0 top-0" />
            </div>
            <span>4.8</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Star;
