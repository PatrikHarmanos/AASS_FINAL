<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    /**
     * Override fillable property data.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'description'
    ];

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'course_tasks')->using(CourseTasks::class)->withTimestamps();
    }
}
