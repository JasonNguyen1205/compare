"use client";
import BaseCamera from "@/components/base-camera";
import Image from "next/image";
import React, { useState } from "react";
import ReactCompareImage from "react-compare-image";

export default function Home() {
	const [urlImageFirst, setUrlImageFirst] = useState("");
	const [urlImageSecond, setUrlImageSecond] = useState("");
	const [urlImageFirstDone, setUrlImageFirstDone] = useState("");
	const [urlImageSecondDone, setUrlImageSecondDone] = useState("");

	const [a, setA] = useState("");
	const [b, setB] = useState("");
	const [c, setC] = useState("");
	const [d, setD] = useState("");
	const [e, setE] = useState("");
	const [f, setF] = useState("");

	const [filenameTemplate, setFilenameTemplate] = useState("");
	const [filenameUpload, setFilenameUpload] = useState("");
	const [resultVisual, setResultVisual] = useState("");
	const [original, setOriginal] = useState("");
	const [matchingArea, setMatchingArea] = useState("");

	const [diffDetail, setDiffDetail] = useState("");

	const onUploadPhotoTemplate = async (e, cb, folder) => {
		setUrlImageSecond("");
		setUrlImageFirstDone("");
		setUrlImageSecondDone("");
		setOriginal("");
		setMatchingArea("");
		setDiffDetail("");
		setA("");
		setB("");
		setC("");
		setD("");
		setE("");
		setF("");
		let newForm = new FormData();
		newForm.append("file", e.target.files[0]);
		await fetch(`/api/upload/${folder}`, { method: "POST", body: newForm })
			.then((result) => {
				const newUrl = URL.createObjectURL(e.target.files[0]);
				cb(newUrl);
				setFilenameTemplate(e.target.files[0].name);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const onUploadPhoto = async (e, cb, folder) => {
		setUrlImageFirstDone("");
		setUrlImageSecondDone("");
		setOriginal("");
		setMatchingArea("");
		setDiffDetail("");
		setA("");
		setB("");
		setC("");
		setD("");
		setE("");
		setF("");
		let newForm = new FormData();
		newForm.append("file", e.target.files[0]);
		await fetch(`/api/upload/${folder}`, { method: "POST", body: newForm })
			.then((result) => {
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
		setOriginal("");
		setMatchingArea("");
		setDiffDetail("");
		setA("");
		setB("");
		setC("");
		setD("");
		setE("");
		setF("");

		let response = await fetch(
			`http://10.100.27.72:4000/${filenameTemplate}/${filenameUpload}`,
			{
				method: "POST",
			}
		).catch((err) => {
			console.log(err);
		});


		
		if (response != null) {
			setResultVisual(response.json());
			setUrlImageSecond("http://10.100.27.72:4000/image2");
			setUrlImageFirstDone("http://10.100.27.72:4000/diff");
			setUrlImageSecondDone("http://10.100.27.72:4000/difference");
			setOriginal("http://10.100.27.72:4000/template");
			setMatchingArea("http://10.100.27.72:4000/marked0");
			setDiffDetail("http://10.100.27.72:4000/image2");
			setA("http://10.100.27.72:4000/marked0");
			setB("http://10.100.27.72:4000/marked1");
			setC("http://10.100.27.72:4000/marked2");
			setD("http://10.100.27.72:4000/marked3");
			setE("http://10.100.27.72:4000/marked4");
			setF("http://10.100.27.72:4000/marked5");
		} else {
			setResultVisual("");
			setUrlImageSecond("");
			setUrlImageFirstDone("");
			setUrlImageSecondDone("");
			setOriginal("");
			setMatchingArea("");
			setDiffDetail("");
			setA("");
			setB("");
			setC("");
			setD("");
			setE("");
			setF("");
		}

		console.log(resultVisual);
	};

	return (
		<div className="bg-white dark:dark:bg-slate-800 m-0 p-5">
			<div className="bg-white dark:bg-slate-800 w-full m-0 p-0">
				<h1>FRIWO Vietnam</h1>
				<h3>Visual Inspection Helper</h3>
				<div className="grid grid-cols-2 gap-2  m-0 p-0 ">
					<div className="col-span-1 flex gap-2 items-center justify-between max-sm:flex-col">
						<BaseCamera
							cb={setUrlImageFirst}
							folder="img1"
							name={filenameTemplate}
						/>
						<label
							className="border bg flex items-center gap-2 border-gray-600 bg-gray-600 px-3 py-1 rounded-sm hover:bg-gray-400 text-white transition-all ease-in-out"
							htmlFor="file-first"
						>
							{filenameTemplate == "" ? "Select pattern" : " "}
							<Image src={require("../assets/icons/upload.svg")} width={18} />
							{filenameTemplate}
						</label>
						<input
							id="file-first"
							className="hidden"
							onChange={async (event) => {
								await onUploadPhotoTemplate(
									event,
									setUrlImageFirst,
									"img1"
								).then((r) => {
									console.log(r);
								});
							}}
							type="file"
							multiple={false}
						/>
					</div>

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
					<div className="mb-5 rounded-md justify-center shadow-md">
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
					<div className=" grid grid-cols-3 gap-2">
						<div className="">
							<img
								className="mb-5 rounded-md justify-center shadow-md"
								src={a}
							/>
						</div>
						<div>
							<img
								className="mb-5 rounded-md justify-center shadow-md"
								src={b}
							/>
						</div>
						<div>
							{" "}
							<img
								className="mb-5 rounded-md justify-center shadow-md"
								src={c}
							/>
						</div>
						<div>
							{" "}
							<img
								className="mb-5 rounded-md justify-center shadow-md"
								src={d}
							/>
						</div>
						<div>
							{" "}
							<img
								className="mb-5 rounded-md justify-center shadow-md"
								src={e}
							/>
						</div>
						<div>
							{" "}
							<img
								className="mb-5 rounded-md justify-center shadow-md "
								src={f}
							/>
						</div>
					</div>
				</div>
			</div>
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
			</div>
			<div>
				<img
					className="w-full border rounded-lg m-2 font-semibold transform duration-150 ease-in-out  "
					src={diffDetail}
					alt=""
				/>
			</div>
			<div>
				<img
					className="w-full border rounded-lg m-2 font-semibold transform duration-150 ease-in-out "
					src={original}
					alt=""
				/>
			</div>
			<div>
				<img
					className="w-full border rounded-lg m-2 font-semibold transform duration-150 ease-in-out "
					src={matchingArea}
					alt=""
				/>
			</div>
		</div>
	);
}
