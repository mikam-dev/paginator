import { NextRequest, NextResponse } from 'next/server';

import dbConnect from '@/db/db-connect';
import Case from '@/db/models/case.model';
import User from '@/db/models/user.model';
import Organization from '@/db/models/organization.model';

/**
 * Handles GET requests to fetch documents based on model type with pagination and optional date filters.
 *
 * @param {NextRequest} request - The Next.js request object.
 * @param {object} params - URL parameters.
 * @param {string} params.model - The model type ('case', 'user', 'organization').
 * @returns {Promise<NextResponse>} A NextResponse object containing the fetched data or an error message.
 */
export async function GET(
  request: NextRequest, 
  { params }: { params: { model: string } }) {
  await dbConnect();

  const model = params.model;
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  // Extract and handle query parameters
  const olderThan = searchParams.get('olderThan');
  const newerThan = searchParams.get('newerThan');
  const page = parseInt(searchParams.get('page') || '1', 10);
  let count = parseInt(searchParams.get('count') || '10', 10);
  count = count > 50 ? 50 : count;

  // Apply date filters and pagination
  const queryFilters: Record<string, any> = {};
  if (olderThan) {
    queryFilters.created = { 
      $lte: new Date(olderThan).getTime() 
    };
  }
  if (newerThan) {
    queryFilters.created = { 
      ...queryFilters.created, 
      $gte: new Date(newerThan).getTime() 
    };
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
        return NextResponse.json({ error: 'No model specified' }, { status: 400 });
    }

    // Calculate total pages and pagination links
    const totalPages = Math.ceil(totalDocuments / count);
    
  /**
   * Creates a URL for pagination with updated page numbers while preserving other parameters.
   *
   * @param {number} newPage - The new page number to set in the URL.
   * @returns {string} The updated URL with the new page number.
   */
    const createPaginationUrl = (newPage: number) => {
      // Create a new URL object based on the current request URL
      const url = new URL(request.url);

      // Create an instance of URLSearchParams from the current URL's search parameters
      const searchParams = new URLSearchParams(url.searchParams);

      // Set the 'page' parameter to the new page number
      searchParams.set('page', newPage.toString());

      // Ensure 'count' parameter is set
      searchParams.set('count', count.toString());

      // Update the URL's search string with the modified search parameters
      url.search = searchParams.toString();

      // Return the updated URL as a string
      return url.toString();
    };

    const paginationLinks = {
      next: page < totalPages ? createPaginationUrl(page + 1) : null,
      prev: page > 1 ? createPaginationUrl(page - 1) : null,
      first: createPaginationUrl(1),
      last: createPaginationUrl(totalPages),
    };

    // Return the response
    return NextResponse.json({ 
      data, 
      links: paginationLinks, 
      totalDocuments, 
      totalPages 
    }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}

/**
 * Handles POST requests to create a new document based on the model type.
 *
 * @param {NextRequest} request - The Next.js request object.
 * @param {object} params - URL parameters.
 * @param {string} params.model - The model type ('case', 'user', 'organization').
 * @returns {Promise<NextResponse>} A NextResponse object confirming creation or an error message.
 */
export async function POST(
  request: NextRequest, 
  { params }: { params: { model: string } }) {
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
    return NextResponse.json({ error: 'Error creating document' }, { status: 500 });
  }
}
