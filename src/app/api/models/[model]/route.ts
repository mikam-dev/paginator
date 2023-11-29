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
    queryFilters.createdAt = { $lt: new Date(olderThan) };
  }
  if (newerThan) {
    queryFilters.createdAt = { ...queryFilters.createdAt, $gt: new Date(newerThan) };
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
    let errorMessage = 'Unknown error occurred';

    // Check if the error is an instance of Error
    if (err instanceof Error) {
      errorMessage = err.message;
      console.log('Error message:', errorMessage);
      console.log('Error stack:', err.stack);
    } else {
      // Handle non-Error objects
      console.log('Non-Error thrown:', err);
    }

    return NextResponse.json({ error: 'Error fetching data', message: errorMessage });
  }
}