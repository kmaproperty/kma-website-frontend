import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const tokenFromEnv = process.env.SUREPASS_BEARER_TOKEN;
    const baseUrl = process.env.SUREPASS_BASE_URL;

    if (!tokenFromEnv || !baseUrl) {
      return Response.json(
        { error: "Missing Surepass environment variables" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { account_number, ifsc, beneficiary_name } = body;

    if (!account_number || !ifsc) {
      return Response.json(
        { error: "account_number and ifsc are required" },
        { status: 400 }
      );
    }

    const res = await fetch(`${baseUrl}/api/v1/bank-verification/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenFromEnv}`,
      },
      body: JSON.stringify({
        id_number: account_number,
        ifsc,
        beneficiary_name: beneficiary_name || "",
      }),
      cache: "no-store",
    });

    const json = await res.json();

    return Response.json(json, { status: res.status });
  } catch (error: any) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
