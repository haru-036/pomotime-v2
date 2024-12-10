import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Timer from "./components/timer";

const App = () => {
  return (
    <>
      <div className="min-h-screen max-w-screen-sm mx-auto flex flex-col gap-10 justify-center items-center px-8 font-RobotoMono">
        <TabGroup
          className={"flex flex-col gap-10 justify-center items-center"}
        >
          <TabList className={"flex gap-4"}>
            <Tab className="rounded-full py-3 px-8 text-lg font-semibold text-white focus:outline-none data-[selected]:bg-white/20 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
              Focus
            </Tab>
            <Tab
              className={
                "rounded-full py-3 px-8 text-lg font-semibold text-white focus:outline-none data-[selected]:bg-white/20 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
              }
            >
              Break
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Timer focus={true} />
            </TabPanel>
            <TabPanel>
              <Timer focus={false} />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </>
  );
};

export default App;
