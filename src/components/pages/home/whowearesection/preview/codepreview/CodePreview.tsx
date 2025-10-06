import { Checkbox } from "@/components/ui/checkbox";
import Request from "./RequestComponent";
import { ArrowDown, Underline } from "lucide-react";
import { useState } from "react";

const data = [
  {
    selected: true,
    key: "id",
    value: "4UDE-asdkla-lhp23",
    description: "Unique identifier for the request",
  },
  {
    selected: true,
    key: "company",
    value: "Seevra",
    description: "Company name",
  },
];

export default function CodePreview() {
  const [isSending, setIsSending] = useState(false);

  return (
    <div className="flex flex-col px-2 gap-1">
      <div className="flex gap-2 items-center">
        <span className="text-[#028192] text-xs">HTTP</span>
        <span className="text-sm">
          REST API basics: CRUD, test & variable / https://api.openai.com/v1/completions
        </span>
      </div>

      <Request isSending={isSending} setIsSending={setIsSending} />

      <div className="p-2 flex items-center justify-between w-8/12">
        <span className="text-sm text-gray-500">Params</span>
        <span className="text-sm text-gray-500">Authorization</span>
        <span className="text-sm border-b border-orange-400 px-1">
          Headers <span className="text-[#028192]">(11)</span>
        </span>
        <span className="text-sm text-gray-500">Body</span>
        <span className="text-sm text-gray-500">Scripts</span>
        <span className="text-sm text-gray-500">Tests</span>
        <span className="text-sm text-gray-500">Settings</span>
      </div>

      <hr className="border-t-2 my-3" />
      <h1 className="text-gray-500">Query Params</h1>

      <div className="">
        <table className="w-full border border-collapse  text-xs md:text-sm">
          <thead className="text-white bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left"></th>
              <th className="px-4 py-2 text-left">Key</th>
              <th className="px-4 py-2 text-left">Value</th>
              <th className="px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx} className="border-b last:border-0">
                <td className="px-4 py-2 font-mono border text-red-500">
                  <Checkbox />
                </td>
                <td className="px-4 py-2 font-mono border text-red-500">
                  "{item.key}"
                </td>
                <td className="px-4 py-2 font-mono border text-green-600">
                  "{item.value}"
                </td>
                <td className="px-4 py-2 border text-gray-600">{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between w-full mt-2">
        <div className="gap-5 flex items-center">
          <span className="text-black py-1 my-1 text-xs md:text-sm border-b">body</span>
          <span className="text-xs md:text-sm">
            Cookies <span className="text-green-500">(2)</span>
          </span>
          <span className="text-xs md:text-sm">
            Headers <span className="text-green-500">(20)</span>
          </span>
          <span className="text-xs md:text-sm">Test Results</span>
        </div>
        <div className="flex gap-5 items-center">
          <span className="text-xs md:text-sm text-gray-500">
            Headers: <span className="text-green-500">200 OK</span>
          </span>
          <span className="text-xs md:text-sm text-gray-500">
            Headers: <span className="text-green-500">1682 ms</span>
          </span>
        </div>
      </div>

      <div className="bg-white flex px-1 gap-5 mt-3">
        <div className="py-2 px-2 gap-7 flex items-center rounded-md bg-gray-100">
          <span className="text-black">Pretty</span>
          <span className="text-gray-500">Raw</span>
          <span className="text-gray-500">Preview</span>
          <span className="text-gray-500">Visualize</span>
        </div>
        <div className="flex gap-2 items-center p-2 rounded-md bg-gray-100">
          <span className="text-gray-500">JSON</span>
          <ArrowDown size={20} color="gray" />
        </div>
        <div className="flex gap-2 items-center p-2 rounded-md bg-gray-100">
          <Underline size={22} color="red" />
        </div>
      </div>

      {isSending && (
        <pre className="text-xs md:text-sm p-3 rounded-lg bg-black text-white mt-4">
          <code className="font-mono leading-6">
            <span className="text-gray-400">1 </span>
            {"{"}
            {"\n"}
            <span className="text-gray-400">2 </span>
            <span className="text-red-400">"id"</span>:{" "}
            <span className="text-green-400">"4UDE-asdkla-lhp23"</span>,
            {"\n"}
            <span className="text-gray-400">3 </span>
            <span className="text-red-400">"company"</span>:{" "}
            <span className="text-green-400">"Seevra"</span>,
            {"\n"}
            <span className="text-gray-400">4 </span>
            <span className="text-red-400">"country"</span>:{" "}
            <span className="text-green-400">"Algeria"</span>,
            {"\n"}
            <span className="text-gray-400">5 </span>
            <span className="text-red-400">"domain"</span>:{" "}
            <span className="text-green-400">"Digital Solutions"</span>
            {"\n"}
            <span className="text-gray-400">6 </span>
            {"}"}
          </code>
        </pre>
      )}
    </div>
  );
}
