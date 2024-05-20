const predictClassification = require("../services/inferenceService");
const { Firestore } = require("@google-cloud/firestore");
const storeData = require("../services/storeData");
const crypto = require("crypto");

async function postPredictHandler(request, h) {
	const { image } = request.payload;
	const { model } = request.server.app;

	const { label, suggestion } = await predictClassification(model, image);
	const id = crypto.randomUUID();
	const createdAt = new Date().toISOString();

	const data = {
		id: id,
		result: label,
		suggestion: suggestion,
		createdAt: createdAt,
	};

	const response = h.response({
		status: "success",
		message: "Model is predicted successfully",
		data,
	});

	await storeData(id, data);
	response.code(201);
	return response;
}

async function getPredictionHistoriesHandler(request, h) {
	try {
		const firestore = new Firestore();
		const predictionSnapshot = await firestore.collection("prediction").get();
		const predictionHistories = predictionSnapshot.docs.map((document) => {
			const predictionData = document.data();
			return {
				id: document.id,
				history: {
					result: predictionData.result,
					createdAt: predictionData.createdAt,
					suggestion: predictionData.suggestion,
					id: document.id,
				},
			};
		});

		if (predictionHistories.length > 0) {
			return h.response({
				status: "success",
				data: predictionHistories,
			});
			response.code(201);
		} else {
			return h.response({
				status: "success",
				data: [],
				message: "Tidak ada prediction history yang ditemukan",
			});
			response.code(201);
		}
	} catch (error) {
		return h.response({
			status: "fail",
			message: "Gagal mengambil predicton history",
		});
		response.code(500);
	}
}

module.exports = {
	postPredictHandler,
	getPredictionHistoriesHandler,
};
