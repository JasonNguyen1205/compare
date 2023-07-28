"use client";
import BaseCamera from "@/components/base-camera";
import Image from "next/image";
import { useState } from "react";
import ReactCompareImage from "react-compare-image";

export default function Home() {
	const [urlImageFirst, setUrlImageFirst] = useState("");
	const [urlImageSecond, setUrlImageSecond] = useState("");
	const [urlImageFirstDone, setUrlImageFirstDone] = useState("");
	const [urlImageSecondDone, setUrlImageSecondDone] = useState("");

	const [b, setB] = useState("");
	const [c, setC] = useState("");
	const [a, setA] = useState("");
	const [d, setD] = useState("");
	const [e, setE] = useState("");


	const [filenameUpload, setFilenameUpload] = useState("");

	const [resultVisual, setResultVisual] = useState("");

	const [diffDetail, setDiffDetail] = useState("");


	const onUploadPhoto = async (e, cb, folder) => {
		setUrlImageFirstDone("");
		setUrlImageSecondDone("");
		setDiffDetail("");
		setA("");
		setB("");
		setC("");
		setD("");
		setE("");
		let newForm = new FormData();
		newForm.append("file", e.target.files[0]);
		await fetch(`/api/upload/${folder}`, { method: "POST", body: newForm })
			.then(() => {
				const newUrl = URL.createObjectURL(e.target.files[0]);
				cb(newUrl);
				setFilenameUpload(e.target.files[0].name);
			})
			.catch((err) => {
				console.log(err);
			});
	};


	const startVisual = async () => {
		setUrlImageFirstDone("");
		setUrlImageSecondDone("");
		setDiffDetail("");
		setA("");
		setB("");
		setC("");
		setD("");
		setE("");

		let response = await fetch(
			`http://10.100.27.61:4000/PartNo/Stations/${filenameUpload}`,
			{
				method: "POST",
			}
		).catch((err) => {
			console.log(err);
		});



		if (response != null) {

			const arr = response.json();
			console.log(arr);

			setUrlImageFirst("http://10.100.27.61:4000/5/image1");
			setUrlImageSecond("http://10.100.27.61:4000/5/image2");
			setUrlImageFirstDone("http://10.100.27.61:4000/5/diff");
			setUrlImageSecondDone("http://10.100.27.61:4000/5/difference");
			setDiffDetail("http://10.100.27.61:4000/5/image2");
			setE("http://10.100.27.61:4000/0/diff");
			setA("http://10.100.27.61:4000/1/diff");
			setB("http://10.100.27.61:4000/2/diff");
			setC("http://10.100.27.61:4000/3/diff");
			setD("http://10.100.27.61:4000/4/diff");
		} else {
			setResultVisual("");
			setUrlImageSecond("");
			setUrlImageFirstDone("");
			setUrlImageSecondDone("");
			setDiffDetail("");
			setA("");
			setB("");
			setC("");
			setD("");
			setE("");
		}

		console.log(resultVisual);
	};


	return (
		<div className="bg-white dark:dark:bg-slate-800 m-0 p-5">
			<div className="bg-white dark:bg-slate-800 w-full m-0 p-0">
				<h1>FRIWO Vietnam</h1>
				<h3>Visual Inspection Helper</h3>
				<div>
					<button
						onClick={async () => {
							await startVisual();
						}}
						className="bg-blue-600 border font-semibold transform duration-150 ease-in-out hover:bg-opacity-80 border-blue-500 flex gap-2 item-center justify-center p-2 rounded-sm w-full my-10 mt-5"
					>
						<Image
							className=" filter fill-slate-200 "
							src={require("../assets/icons/compare-solid.svg")}
							width={18}
						/>
					</button>
					<div className="col-span-1 flex gap-2 items-center justify-between max-sm:flex-col ">
						<BaseCamera
							cb={setUrlImageSecond}
							folder="img2"
							name={urlImageSecond}
						/>
						<label
							className="border flex items-center gap-2 border-gray-600 px-3 py-1 rounded-sm bg-gray-600 hover:bg-gray-400 text-white transition-all ease-in-out"
							htmlFor="file-second"
						>
							{filenameUpload == "" ? "Select source" : " "}
							<Image
								src={require("../assets/icons/upload.svg")}
								width={18}
								alt=""
							/>
							{filenameUpload}
						</label>
						<input
							id="file-second"
							className="hidden"
							onChange={async (event) => {
								await onUploadPhoto(event, setUrlImageSecond, "img2").then(
									(r) => {
										console.log(r);
									}
								);
							}}
							type="file"
						/>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-2  m-0 p-0 ">

					<div className="mb-5 rounded-md justify-center shadow-md object-scale-down ">
						<ReactCompareImage
							leftImage={urlImageFirst}
							rightImage={urlImageSecond}
						/>
					</div>
					<div className="mb-5 rounded-md justify-center shadow-md">
						<ReactCompareImage
							leftImage={urlImageFirstDone}
							rightImage={urlImageSecondDone}
						/>
					</div>
					<div className=" justify-center  mb-5 rounded-md">
						<h1>
							<b className="font-semibold transform duration-150 ease-in-out ">
								{resultVisual}
							</b>
						</h1>
					</div>
				</div>
				<div className="items-center justify-around">
					<div className=" grid grid-cols-2 gap-1 fit-content overflow-x-hidden">
						<div className="">
							<label className=" ">

							</label>
							<img
								className="mb-5 rounded-md justify-center shadow-md object-contain"
								src={a}
							/>
						</div>
						<div>
							<label className=" ">

							</label>
							<img
								className="mb-5 rounded-md justify-center shadow-md object-contain"
								src={b}
							/>
						</div>
						<div>
							<label className=" ">

							</label>
							<img
								className="mb-5 rounded-md justify-center shadow-md object-contain"
								src={c}
							/>
						</div>
						<div>
							<label className=" ">

							</label>
							<img
								className="mb-5 rounded-md justify-center shadow-md object-contain"
								src={d}
							/>
						</div>
						<div>
							<label className=" ">

							</label>
							<img
								className="mb-5 rounded-md justify-center shadow-md object-contain"
								src={e}
							/>
						</div>
					</div>

					<div className="w-4/5 fit-content overflow-x-hidden">

						<img
							className="mb-5 rounded-md justify-center shadow-md object-scale-down"
							src={diffDetail}
							alt=""
						/>
					</div>

				</div>
			</div>
		</div>
	);
}
