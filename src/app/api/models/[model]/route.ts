// TODO: Create dynamic api route to retrieve Case, User, or Organization items
import { NextRequest, NextResponse } from 'next/server';

import dbConnect from '@/db/db-connect';
import Case from '@/db/models/case.model';
import User from '@/db/models/user.model';
import Organization from '@/db/models/organization.model';

export async function GET(request: Request, { params }: { params: { model: string } }) {
  await dbConnect();

  const model = params.model;
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  // Extract and handle query parameters
  const olderThan = searchParams.get('olderThan');
  const newerThan = searchParams.get('newerThan');
  let count = parseInt(searchParams.get('count') || '10', 10);
  count = count > 50 ? 50 : count;
  const page = parseInt(searchParams.get('page') || '1', 10);

  // Apply date filters and pagination
  const queryFilters: Record<string, any> = {};
  if (olderThan) {
    queryFilters.created = { $lte: new Date(olderThan).getTime() };
  }
  if (newerThan) {
    queryFilters.created = { ...queryFilters.createdAt, $gte: new Date(newerThan).getTime() };
  }
  const skip = (page - 1) * count;

  let data;
  let totalDocuments;

  try {
    // Fetch paginated data based on the model
    switch (model) {
      case 'case':
        data = await Case.find(queryFilters).skip(skip).limit(count).exec();
        totalDocuments = await Case.countDocuments(queryFilters);
      break;
      case 'user':
        data = await User.find(queryFilters).skip(skip).limit(count).exec();
        totalDocuments = await User.countDocuments(queryFilters);
      break;
      case 'organization':
        data = await Organization.find(queryFilters).skip(skip).limit(count).exec();
        totalDocuments = await Organization.countDocuments(queryFilters);
      break;
      default:
        return NextResponse.json({ error: 'No model specified' });
    }

    // Calculate total pages and pagination links
    const totalPages = Math.ceil(totalDocuments / count);
    const createPaginationUrl = (newPage: number) => `${request.url}&page=${newPage}&count=${count}`;
    const paginationLinks = {
      next: page < totalPages ? createPaginationUrl(page + 1) : null,
      prev: page > 1 ? createPaginationUrl(page - 1) : null,
      first: createPaginationUrl(1),
      last: createPaginationUrl(totalPages),
    };

    // Return the response
    return NextResponse.json({ data, links: paginationLinks, totalDocuments, totalPages });
  } catch (err) {
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: { model: string } }) {
  await dbConnect();

  const model = params.model;
  const json = await request.json();

  try {
    switch (model) {
      case 'case':
        await Case.create(json);
        return NextResponse.json({ message: 'Case created' }, { status: 201 });
      case 'user':
        await User.create(json);
        return NextResponse.json({ message: 'User created' }, { status: 201 });
      case 'organization':
        await Organization.create(json);
        return NextResponse.json({ message: 'Organization created' }, { status: 201 });
      default:
        return NextResponse.json({ error: 'No model specified' }, { status: 400 });
    }
  } catch (err) {
    console.error('Error in POST request:', err);
    return NextResponse.json({ error: 'Error creating document' }, { status: 500 });
  }
}
